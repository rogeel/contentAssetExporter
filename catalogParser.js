"use strict";

var fs = require('fs'),
    xml2js = require('xml2js'),
    _ = require('lodash'),
    imageReplacementConfig = require('./image_replacement.json');


class CatalogParser {

  constructor(){
    this._fileName = '';
    this._params = '';
    this._parsedObject = null;
    this._newObject = null;
    this._searchTree = {};
    this._contentIDs = [];
    this._viewTypes = ['large', 'medium', 'small'];
    this._productImagesFolder = 'Products';
    this._sandboxDomainImagesPath = 'http://sits-pod27.demandware.net/dw/image/v2/AATL_S20/on/demandware.static/-/Sites-acd-skinceuticals-master-catalog/default/dwb22169a9/'
  }

  run(fileName, params){
    this.validateInput(fileName, params);
    this.readParameters(params);
    this.readXMLfile(fileName);
  }

  validateInput(fileName, params){
    console.log('fileName', fileName);
    console.log('params', params);

    if(!fileName || !params)
      throw new Error('Please provide both parameters');

    this._fileName = fileName;
    this._params = params;
  }

  readXMLfile(fileName){
    let parser = new xml2js.Parser();
    let that = this;
    fs.readFile(__dirname + '/' + this._fileName, function(err, data) {
      parser.parseString(data, function (err, result) {
        that._parsedObject = result;
        console.log('Original product length: ', result.catalog.product.length);
        that.processContent();
        console.log('New product length: ', that._parsedObject.catalog.product.length);

        that.exportNewXML();
      });
    });
  }

  readParameters(){
    this._contentIDs = this._params.replace(' ', '').split(',');
    console.log('this._contentIDs', this._contentIDs);
  }

  processContent(){
    this._parsedObject.catalog.product = this._parsedObject.catalog.product.map(this.processProduct, this);
  }

  processProduct(o){

    o = this.takeInfoFromJson(o);
    o = this.fillViewTypeFields(o);    
    
    return o;
  }

  takeInfoFromJson(o){
    let productConfig = this.findProductInJsonConfig( o['$']['product-id'] );
    if(productConfig){
      let imageGroup = o.images[0]['image-group'];

      imageGroup.forEach( image => {  
        image['image'][0]['$']['path'] =  `${this._productImagesFolder}/${productConfig.Image}`;
        image['image'][0]['alt'] = {
          '$' : { 'xml:lang' : 'x-default'},
          '_' : productConfig.Alt
        }

        // console.log(`wget ${this._sandboxDomainImagesPath}/${productConfig.Image} && `);
      });
    }
    return o;
  }

  findProductInJsonConfig(id){
   return  _.find(imageReplacementConfig, o => o.Product == id);
  }

  fillViewTypeFields(o){
    if('images' in o && o.images.length > 0){

      if('image-group' in o.images[0]){

        if(o.images[0]['image-group'].length > 0){

          let imageGroup = o.images[0]['image-group'];          
          let notExistentViewTypes = this._viewTypes.slice();
          
          imageGroup.forEach( image => {
            let idx = notExistentViewTypes.indexOf(image['$']['view-type']) ;
            if(idx !== -1){
              notExistentViewTypes.splice(idx, 1);
            }
          });

          notExistentViewTypes.forEach( viewType => {
            let template = JSON.parse(JSON.stringify(imageGroup[0]));
            template['$']['view-type'] = viewType;
            imageGroup.push( template);
          });
        }
      }      
    }

    return o;
  }

  exportNewXML(){
    let builder = new xml2js.Builder();
    let xml = builder.buildObject(this._parsedObject);
    fs.writeFileSync('out-catalog.xml', xml);
  }
}

let obj = new CatalogParser();
obj.run(process.argv[2], process.argv[3]);
