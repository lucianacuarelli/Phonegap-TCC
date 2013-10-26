////////////////////////////////////////////////////////////////////////////////
// Copyright (c)
// All Rights Reserved.
// Todos os direitos reservados.
// 
// @author 		Luciana Cuarelli
// @version 	Mobile 2013
// @about       Classe gerenciadora de componentes do Google Maps.
//
////////////////////////////////////////////////////////////////////////////////	
function UiMaps() {
    var _positions = new Array();
    var _selectedItem = null;
    var _message = null;
    var _messageAlternative = null;
    var _infoWindowOptions = null;
    var posGeoCode = 22;
    var _markersArray = new Array();
    this.directionsSteps = null;
};

//----------------------------------
//install
//----------------------------------
/**
 * NOTDOC.
 */
UiMaps.install = function() {
    if (!window.plugins) {
        window.plugins = {};
    }

    window.plugins.uiMaps = new UiMaps();
    return window.plugins.uiMaps;
};

//Adiciona o plugin ao construtor do Phonegap
PhoneGap.addConstructor(UiMaps.install);

//------------------------------------------------------------------------
//
// Attributes
//
//------------------------------------------------------------------------
//----------------------------------
// _attribute
// ----------------------------------
/**
 * Metodos e atributos privados
 */
UiMaps.prototype._positions = new Array();
UiMaps.prototype._selectedItem = null;
UiMaps.prototype._message = null;
UiMaps.prototype._messageAlternative = null;
UiMaps.prototype._infoWindowOptions = null;
UiMaps.prototype._posGeoCode = 20;
UiMaps.prototype._markersArray = new Array();
UiMaps.prototype.directionsSteps = null;

//------------------------------------------------------------------------
//
// Methods (Públicos)
//
//------------------------------------------------------------------------
// ----------------------------------
// address
// ----------------------------------
/**
 * Configura um ou mais endereços de marcadores que devem ser utilizados na
 * visualização do mapa.
 */
UiMaps.prototype.address = function(value) {
    preparePositions(value);
    return this;
};
//----------------------------------
// categories
// ----------------------------------
var _categories = null;
/**
 * Lista de categorias de marcadores. A lista de categorias deve ser
 * fornecida pelo usuário.
 */
UiMaps.prototype.categories = function(value) {
    _categories = value;
    return this;
};
// ----------------------------------
// connect
// ----------------------------------
/**
 * Inicializa uma solicitação de geocodificação.
 */
UiMaps.prototype.connect = function() {
    totalGeoCode = UiMaps.prototype._positions.length;
    _posGeoCode = 0;

    useClientGeocoder = window.plugins.useClientGeocoder;
    
    onMapReady();
    //useClientGeocoder.setCategories(_categories);
    document.addEventListener("markerCreate", markerCreate, false);
    for ( var i = 0; i < UiMaps.prototype._positions.length; i++) {
        // Verifica se existe ícone
        useClientGeocoder.doGeocode(map, UiMaps.prototype._positions[i], _icon, _message, null,
                null, _infoWindowOptions);
    }
};
// ----------------------------------
// data
// ----------------------------------
/**
 * Configura um ou mais "endereços" de marcadores que devem ser utilizados
 * na visualização do mapa. O "endereço" pode ser informado como o endereço
 * físico(Rua, Avenida, Estado, Cidade, País, CEP) ou endeço
 * geográfico(Latitude, Longitude). É possível passar informações adicionais
 * associadas ao endereço informado.
 * 
 * @param Recebe
 *            uma lista com os endereços e as informações adicionais.
 */
UiMaps.prototype.data = function(arData) {
    for ( var i = 0; i < arData.length; i++) {
        // Verifica se existe position
        if (arData[i].hasOwnProperty("position")) {
            preparePositions(arData[i].position, arData[i]);
        } else {
            throw new Error(
                    "data :: Nenhuma posição de endereço foi configurada em arData[i].position .");
        }
    }
    return this;
};
//----------------------------------
//  enableDoubleClickZoom
//----------------------------------
UiMaps.prototype._enableDoubleClickZoom = true;
/**
 * Ativa o zoom e a centralização com clique duplo. Ativado por padrão.
 */
UiMaps.prototype.enableDoubleClickZoom = function(value) {
    _enableDoubleClickZoom = value;
    return this;

};
//----------------------------------
//  enableDragabble
//----------------------------------
UiMaps.prototype._enableDragabble = true;
/**
 * Se "false", impede que o mapa seja arrastado. O recurso de arrastar está
 * ativado por padrão.
 */
UiMaps.prototype.enableDragabble = function(value) {
    _enableDragabble = value;
    return this;
};
//----------------------------------
//  enableControlByKeyboard
//----------------------------------
UiMaps.prototype._enableControlByKeyboard = true;
/**
 * Se "false", impede o mapa de ser controlado pelo teclado. Os atalhos do
 * teclado estão ativados por padrão.
 */
UiMaps.prototype.enableControlByKeyboard = function(value) {
    _enableControlByKeyboard = value;
    return this;
};
//----------------------------------
//  enableMapTypeControl
//----------------------------------
UiMaps.prototype._enableMapTypeControl = false;
/**
 * O estado inicial ativado/desativado do controle do tipo de mapa.
 */
UiMaps.prototype.enableMapTypeControl = function(value) {
    _enableMapTypeControl = value;
    return this;
};
//----------------------------------
//  enableNavigationControl
//----------------------------------
UiMaps.prototype._enableNavigationControl = true;
/**
 * O estado inicial ativado/desativado do controle do tipo de mapa.
 */
UiMaps.prototype.enableNavigationControl = function(value) {
    _enableNavigationControl = value;
    return this;
};
//----------------------------------
//  enableScaleControl
//----------------------------------
UiMaps.prototype._enableScaleControl = false;
/**
 * O estado inicial ativado/desativado do controle de escala.
 */
UiMaps.prototype.enableScaleControl = function(value) {
    _enableScaleControl = value;
    return this;
};
//----------------------------------
//  enableScrollWheelZoom
//----------------------------------
UiMaps.prototype._enableScrollWheelZoom = true;
/**
 * Se "false", desativa o zoom por meio da roda de rolagem no mapa.
 * A roda de rolagem está ativada por padrão..
 */
UiMaps.prototype.enableScrollWheelZoom = function(value) {
    _enableScrollWheelZoom = value;
    return this;
};
//----------------------------------
//  enableStreetViewControl
//----------------------------------
UiMaps.prototype._enableStreetViewControl = true;
/**
 * O estado ativado/desativado inicial do controle Pegman do Street View.
 */
UiMaps.prototype.enableStreetViewControl = function(value) {
    _enableStreetViewControl = value;
    return this;
};
//----------------------------------
// icon
// ----------------------------------
var _icon = null;

/**
 * Indica o ícone padrão a ser usado nos marcadores. Obs, caso exista alguma
 * especificação de ícones no data ou no categories, eles que serão usados.
 * Para obter um posicionamento ideal, ajuste a posição de centro x, y de
 * seu novo marcador.
 */
UiMaps.prototype.icon = function(url, x, y) {
    _icon = {
        "url" : url,
        "x" : x,
        "y" : y
    };
    return this;
};
//----------------------------------
// show
// ----------------------------------
var _showMap;
/**
 * Configura um ou mais endereços de marcadores que devem ser utilizados na
 * visualização do mapa.
 */
UiMaps.prototype.show = function(value) {
    // _showMap = Use("#" + value);
    _showMap = value;
    onMapReady();
    return this;
};
//------------------------------------------------------------------------
//
// Methods (Privados)
//
//------------------------------------------------------------------------
//----------------------------------
// markerCreate
// ----------------------------------
/**
 * Evento disparado quando um marcador for criado.
 */
markerCreate = function(event) {
    // Adiciona na lista de marcadores as informações do novo marcador
    _markersArray.push(event.foo);
    // Contador de marcadores
    _posGeoCode++;
    // Verifica se todos os marcadores já foram populados no mapa
    if (_posGeoCode >= UiMaps.prototype._positions.length) {
        // Cria novo evento
        var mapEvent = document.createEvent("Event");
        // Configura evento
        mapEvent.initEvent("mapComplete", true, true);
        // Dispara evento que informa que o mapa foi populado
        // completamente
        document.dispatchEvent(mapEvent);
    }
};
// ----------------------------------
// onMapReady
// ----------------------------------
UiMaps.prototype.map;
/**
 * Evento disparado quando um marcador é clicado.
 */
onMapReady = function() {
    // Define a latitude e a longitude inicial do mapa
    var latlng = new google.maps.LatLng(-23.5619212, -46.65563210000005);
    // Configura as opções do mapa
    var myOptions = {
        zoom : 8,
        center : latlng,
        /*disableDoubleClickZoom : !(_enableDoubleClickZoom),
        draggable : _enableDragabble,
        keyboardShortcuts : _enableControlByKeyboard,
        mapTypeControl : _enableMapTypeControl,
        navigationControl : _enableNavigationControl,
        scaleControl : _enableScaleControl,
        scrollwheel : _enableScrollWheelZoom,
        streetViewControl : _enableStreetViewControl,*/
        mapTypeId : google.maps.MapTypeId.ROADMAP
    }
    // Seta as opções no mapa
    // map = new google.maps.Map(document.getElementById(_showMap),
    // myOptions);
    map = new google.maps.Map(document.getElementById("map"), myOptions);
};

// ---------------------------------
// preparePositions
// ----------------------------------
/**
 * Prepara e adiciona em uma lista asconfigurações de endereço para realizar
 * a visualização no mapa.
 * 
 * @return void
 */
preparePositions = function(value, data) {
    
    data = data || null;

    // Verifica se o valor recebido é um objeto ou um String
    if (typeof (value) == "string") {
        UiMaps.prototype._positions.push({
            "position" : value,
            "data" : data
        });
    } else if (typeof (value) == "object") {
        for ( var i = 0; i < value.length; i++) {
            // Verifica se o valor recebido é um objeto ou um String
            if (typeof (value[i]) == "string") {
                UiMaps.prototype._positions.push({
                    "position" : value[i],
                    "data" : data
                });
            } else {
                UiMaps.prototype._positions.push({
                    "position" : value[i].position,
                    "data" : data
                });
            }
        }
    }
};