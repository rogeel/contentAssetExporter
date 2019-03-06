"use strict";

var fs = require('fs'),
    xml2js = require('xml2js'),
    _ = require('lodash');

class CAExoportParser {

  contructor(){
    this._fileName = '';
    this._params = '';
    this._parsedObject = null;
    this._newObject = null;
    this._searchTree = {};
    this._contentIDs = [];
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
        console.log('Original folder length: ', result.library.folder.length);
        // console.log('Folder example: ', JSON.stringify(result.library.folder, null, 2));
        console.log('Original Content length: ', result.library.content.length);
        // console.log('Content example: ', JSON.stringify(result.library.content[0], null, 2));

        that.processContent();
        console.log('New folder length: ', that._parsedObject.library.folder.length);
        console.log('New Content length: ', that._parsedObject.library.content.length);

        that.exportNewXML();
      });
    });
  }

  readParameters(){
    this._contentIDs = this._params.replace(' ', '').split(',');
    console.log('this._contentIDs', this._contentIDs);
    console.log('this._contentIDs. length: ', this._contentIDs.length);
  }

  processContent(){
    let that = this;
    this._parsedObject.library.folder = _.filter(this._parsedObject.library.folder, o =>  {
      return that._addContent(o, 'folder-id');
    });

    this._parsedObject.library.content = _.filter(this._parsedObject.library.content, o =>  {
      return  that._addContent(o, 'content-id');
    });
  }

  _addContent(o, key){

    if( this._contentIDs.indexOf(o.$[key]) !== -1 )
      return true;

    if( o['parent'] &&
        o['parent'] instanceof Array &&
        this._contentIDs.indexOf(o['parent'][0] ) !== -1 )
    {
      this._contentIDs.push(o.$[key])
      return true;
    }

    if( o['folder-links'] &&
        o['folder-links'] instanceof Array &&
        o['folder-links'][0] &&
        o['folder-links'][0]['classification-link'] &&
        o['folder-links'][0]['classification-link'][0] &&
        o['folder-links'][0]['classification-link'][0]['$'] &&
        o['folder-links'][0]['classification-link'][0]['$']['folder-id'] &&
        this._contentIDs.indexOf( o['folder-links'][0]['classification-link'][0]['$']['folder-id'] ) !== -1
      )
    {
      this._contentIDs.push(o.$[key])
      return true;
    }

    return false;
  }

  getContentParentFolder(){

  }

  exportNewXML(){
    let builder = new xml2js.Builder();
    let xml = builder.buildObject(this._parsedObject);
    fs.writeFileSync('out.xml', xml);
  }
}

let obj = new CAExoportParser();
obj.run(process.argv[2], process.argv[3]);
