"use strict";

var fs = require('fs'),
    xml2js = require('xml2js'),
    _ = require('lodash');

class CAExoportParser {

    contructor() {
        this._fileName = '';
        this._params = '';
        this._parsedObject = null;
        this._newObject = null;
        this._searchTree = {};
        this._contentIDs = [];
        this._customAttribute = [];
        this._authors = {};
        this._tags = {};
    }

    run(fileName, params) {
        this.validateInput(fileName);
        this.readXMLfile(fileName);
    }

    validateInput(fileName) {
        console.log('fileName');

        if (!fileName)
            throw new Error('Please provide both parameters');

        this._fileName = fileName;

        this._authors = {
            "attribute-definition": {
                "-attribute-id": "contentAuthor",
                "display-name": {
                    "-xml:lang": "x-default",
                    "#text": "Article's Author"
                },
                "description": {
                    "-xml:lang": "x-default",
                    "#text": "Article's Author"
                },
                "type": "enum-of-string",
                "localizable-flag": "false",
                "mandatory-flag": "false",
                "externally-managed-flag": "false",
                "value-definitions": {
                    "value-definition": [{
                            "display": {
                                "-xml:lang": "x-default",
                                "#text": "Abbie Addotta"
                            },
                            "value": "1"
                        },
                        {
                            "display": {
                                "-xml:lang": "x-default",
                                "#text": "Al Campbell"
                            },
                            "value": "2"
                        },
                        {
                            "display": {
                                "-xml:lang": "x-default",
                                "#text": "Alex Lazic"
                            },
                            "value": "3"
                        },
                        {
                            "display": {
                                "-xml:lang": "x-default",
                                "#text": "Alexa Joly"
                            },
                            "value": "4"
                        },
                        {
                            "display": {
                                "-xml:lang": "x-default",
                                "#text": "Alii Wray"
                            },
                            "value": "5"
                        },
                        {
                            "display": {
                                "-xml:lang": "x-default",
                                "#text": "Amanda Epstein"
                            },
                            "value": "6"
                        },
                        {
                            "display": {
                                "-xml:lang": "x-default",
                                "#text": "Anh Co Tran"
                            },
                            "value": "7"
                        },
                        {
                            "display": {
                                "-xml:lang": "x-default",
                                "#text": "Anthony Diaz"
                            },
                            "value": "8"
                        },
                        {
                            "display": {
                                "-xml:lang": "x-default",
                                "#text": "Ashley Brown"
                            },
                            "value": "9"
                        },
                        {
                            "display": {
                                "-xml:lang": "x-default",
                                "#text": "Ashley Giannetto"
                            },
                            "value": "10"
                        },
                        {
                            "display": {
                                "-xml:lang": "x-default",
                                "#text": "Ashley Lee"
                            },
                            "value": "11"
                        },
                        {
                            "display": {
                                "-xml:lang": "x-default",
                                "#text": "Ashley Zajac"
                            },
                            "value": "12"
                        },
                        {
                            "display": {
                                "-xml:lang": "x-default",
                                "#text": "Autumn Queen"
                            },
                            "value": "13"
                        },
                        {
                            "display": {
                                "-xml:lang": "x-default",
                                "#text": "Belinda Gambuzza"
                            },
                            "value": "14"
                        },
                        {
                            "display": {
                                "-xml:lang": "x-default",
                                "#text": "Brayden Pelletier"
                            },
                            "value": "15"
                        },
                        {
                            "display": {
                                "-xml:lang": "x-default",
                                "#text": "Breck Csicsai"
                            },
                            "value": "16"
                        },
                        {
                            "display": {
                                "-xml:lang": "x-default",
                                "#text": "Brooke Evans"
                            },
                            "value": "17"
                        },
                        {
                            "display": {
                                "-xml:lang": "x-default",
                                "#text": "Carly Quist"
                            },
                            "value": "18"
                        },
                        {
                            "display": {
                                "-xml:lang": "x-default",
                                "#text": "Carmen Serna"
                            },
                            "value": "19"
                        },
                        {
                            "display": {
                                "-xml:lang": "x-default",
                                "#text": "Chelsea James"
                            },
                            "value": "20"
                        },
                        {
                            "display": {
                                "-xml:lang": "x-default",
                                "#text": "Christine Fitzpatrick"
                            },
                            "value": "21"
                        },
                        {
                            "display": {
                                "-xml:lang": "x-default",
                                "#text": "Christopher Walsh"
                            },
                            "value": "22"
                        },
                        {
                            "display": {
                                "-xml:lang": "x-default",
                                "#text": "Claudia DiMuro"
                            },
                            "value": "23"
                        },
                        {
                            "display": {
                                "-xml:lang": "x-default",
                                "#text": "Constance Robbins"
                            },
                            "value": "24"
                        },
                        {
                            "display": {
                                "-xml:lang": "x-default",
                                "#text": "Cory Hoffman"
                            },
                            "value": "25"
                        },
                        {
                            "display": {
                                "-xml:lang": "x-default",
                                "#text": "Dale Ruby Moriarty"
                            },
                            "value": "26"
                        },
                        {
                            "display": {
                                "-xml:lang": "x-default",
                                "#text": "Daniel Mason Jones"
                            },
                            "value": "27"
                        },
                        {
                            "display": {
                                "-xml:lang": "x-default",
                                "#text": "Danielle Keasling"
                            },
                            "value": "28"
                        },
                        {
                            "display": {
                                "-xml:lang": "x-default",
                                "#text": "Daryce Brown-Willis"
                            },
                            "value": "29"
                        },
                        {
                            "display": {
                                "-xml:lang": "x-default",
                                "#text": "David Alexander"
                            },
                            "value": "30"
                        },
                        {
                            "display": {
                                "-xml:lang": "x-default",
                                "#text": "Detra Smith"
                            },
                            "value": "31"
                        },
                        {
                            "display": {
                                "-xml:lang": "x-default",
                                "#text": "Dilek Onur-Taylor"
                            },
                            "value": "32"
                        },
                        {
                            "display": {
                                "-xml:lang": "x-default",
                                "#text": "DJ McGinley"
                            },
                            "value": "33"
                        },
                        {
                            "display": {
                                "-xml:lang": "x-default",
                                "#text": "Dr. Kari Williams"
                            },
                            "value": "34"
                        },
                        {
                            "display": {
                                "-xml:lang": "x-default",
                                "#text": "Drew Schaefering"
                            },
                            "value": "35"
                        },
                        {
                            "display": {
                                "-xml:lang": "x-default",
                                "#text": "Elizabeth Hall"
                            },
                            "value": "36"
                        },
                        {
                            "display": {
                                "-xml:lang": "x-default",
                                "#text": "Emily Arata"
                            },
                            "value": "37"
                        },
                        {
                            "display": {
                                "-xml:lang": "x-default",
                                "#text": "Erica Moomey"
                            },
                            "value": "38"
                        },
                        {
                            "display": {
                                "-xml:lang": "x-default",
                                "#text": "Erik E. Taylor"
                            },
                            "value": "39"
                        },
                        {
                            "display": {
                                "-xml:lang": "x-default",
                                "#text": "Evan Georgopoulos"
                            },
                            "value": "40"
                        },
                        {
                            "display": {
                                "-xml:lang": "x-default",
                                "#text": "Evie Johnson"
                            },
                            "value": "41"
                        },
                        {
                            "display": {
                                "-xml:lang": "x-default",
                                "#text": "Faran Krentcil"
                            },
                            "value": "42"
                        },
                        {
                            "display": {
                                "-xml:lang": "x-default",
                                "#text": "Gabriela Revellese"
                            },
                            "value": "43"
                        },
                        {
                            "display": {
                                "-xml:lang": "x-default",
                                "#text": "Genesis Rivas"
                            },
                            "value": "44"
                        },
                        {
                            "display": {
                                "-xml:lang": "x-default",
                                "#text": "George Papanikolas"
                            },
                            "value": "45"
                        },
                        {
                            "display": {
                                "-xml:lang": "x-default",
                                "#text": "Guido Palau"
                            },
                            "value": "46"
                        },
                        {
                            "display": {
                                "-xml:lang": "x-default",
                                "#text": "Hair.com"
                            },
                            "value": "47"
                        },
                        {
                            "display": {
                                "-xml:lang": "x-default",
                                "#text": "Heather King"
                            },
                            "value": "48"
                        },
                        {
                            "display": {
                                "-xml:lang": "x-default",
                                "#text": "J Ladner"
                            },
                            "value": "49"
                        },
                        {
                            "display": {
                                "-xml:lang": "x-default",
                                "#text": "Jackie Burns Brisman"
                            },
                            "value": "50"
                        },
                        {
                            "display": {
                                "-xml:lang": "x-default",
                                "#text": "Jackie Epperson"
                            },
                            "value": "51"
                        },
                        {
                            "display": {
                                "-xml:lang": "x-default",
                                "#text": "Jacqueline Lusignan"
                            },
                            "value": "52"
                        },
                        {
                            "display": {
                                "-xml:lang": "x-default",
                                "#text": "Jada Jenkins"
                            },
                            "value": "53"
                        },
                        {
                            "display": {
                                "-xml:lang": "x-default",
                                "#text": "Jamal Edmonds"
                            },
                            "value": "54"
                        },
                        {
                            "display": {
                                "-xml:lang": "x-default",
                                "#text": "Jamie Wiley"
                            },
                            "value": "55"
                        },
                        {
                            "display": {
                                "-xml:lang": "x-default",
                                "#text": "Janine Whitman"
                            },
                            "value": "56"
                        },
                        {
                            "display": {
                                "-xml:lang": "x-default",
                                "#text": "Jasmine Anna Galazka"
                            },
                            "value": "57"
                        },
                        {
                            "display": {
                                "-xml:lang": "x-default",
                                "#text": "Jason Backe"
                            },
                            "value": "58"
                        },
                        {
                            "display": {
                                "-xml:lang": "x-default",
                                "#text": "Jelani Addams Rosa"
                            },
                            "value": "59"
                        },
                        {
                            "display": {
                                "-xml:lang": "x-default",
                                "#text": "Jennifer Gillis"
                            },
                            "value": "60"
                        },
                        {
                            "display": {
                                "-xml:lang": "x-default",
                                "#text": "Jeremy Taylor"
                            },
                            "value": "61"
                        },
                        {
                            "display": {
                                "-xml:lang": "x-default",
                                "#text": "Jessica Gonsalves"
                            },
                            "value": "62"
                        },
                        {
                            "display": {
                                "-xml:lang": "x-default",
                                "#text": "Jessica Khorsandi"
                            },
                            "value": "63"
                        },
                        {
                            "display": {
                                "-xml:lang": "x-default",
                                "#text": "Jessica Kittredge"
                            },
                            "value": "64"
                        },
                        {
                            "display": {
                                "-xml:lang": "x-default",
                                "#text": "Jessica Quinn"
                            },
                            "value": "65"
                        },
                        {
                            "display": {
                                "-xml:lang": "x-default",
                                "#text": "Jessie Amato"
                            },
                            "value": "66"
                        },
                        {
                            "display": {
                                "-xml:lang": "x-default",
                                "#text": "Johnny Ramirez"
                            },
                            "value": "67"
                        },
                        {
                            "display": {
                                "-xml:lang": "x-default",
                                "#text": "Josh Velazquez"
                            },
                            "value": "68"
                        },
                        {
                            "display": {
                                "-xml:lang": "x-default",
                                "#text": "Josh Wood"
                            },
                            "value": "69"
                        },
                        {
                            "display": {
                                "-xml:lang": "x-default",
                                "#text": "Joshua Rossignol"
                            },
                            "value": "70"
                        },
                        {
                            "display": {
                                "-xml:lang": "x-default",
                                "#text": "Karen Baxter"
                            },
                            "value": "71"
                        },
                        {
                            "display": {
                                "-xml:lang": "x-default",
                                "#text": "Karla Valenzuela"
                            },
                            "value": "72"
                        },
                        {
                            "display": {
                                "-xml:lang": "x-default",
                                "#text": "Katie Collette"
                            },
                            "value": "73"
                        },
                        {
                            "display": {
                                "-xml:lang": "x-default",
                                "#text": "Katie Lopez"
                            },
                            "value": "74"
                        },
                        {
                            "display": {
                                "-xml:lang": "x-default",
                                "#text": "Kelli Hovey"
                            },
                            "value": "75"
                        },
                        {
                            "display": {
                                "-xml:lang": "x-default",
                                "#text": "Kristj'n Holt"
                            },
                            "value": "76"
                        },
                        {
                            "display": {
                                "-xml:lang": "x-default",
                                "#text": "Lasha Keller"
                            },
                            "value": "77"
                        },
                        {
                            "display": {
                                "-xml:lang": "x-default",
                                "#text": "Laura Carmichael"
                            },
                            "value": "78"
                        },
                        {
                            "display": {
                                "-xml:lang": "x-default",
                                "#text": "Laura Dyer"
                            },
                            "value": "79"
                        },
                        {
                            "display": {
                                "-xml:lang": "x-default",
                                "#text": "Laura Gibson"
                            },
                            "value": "80"
                        },
                        {
                            "display": {
                                "-xml:lang": "x-default",
                                "#text": "Lauren Sill"
                            },
                            "value": "81"
                        },
                        {
                            "display": {
                                "-xml:lang": "x-default",
                                "#text": "L'ah Chablin"
                            },
                            "value": "82"
                        },
                        {
                            "display": {
                                "-xml:lang": "x-default",
                                "#text": "Leeanne Shade"
                            },
                            "value": "83"
                        },
                        {
                            "display": {
                                "-xml:lang": "x-default",
                                "#text": "Lena La Monaco"
                            },
                            "value": "84"
                        },
                        {
                            "display": {
                                "-xml:lang": "x-default",
                                "#text": "Madison Wade"
                            },
                            "value": "85"
                        },
                        {
                            "display": {
                                "-xml:lang": "x-default",
                                "#text": "Matt Fugate"
                            },
                            "value": "86"
                        },
                        {
                            "display": {
                                "-xml:lang": "x-default",
                                "#text": "Matthew Collins"
                            },
                            "value": "87"
                        },
                        {
                            "display": {
                                "-xml:lang": "x-default",
                                "#text": "Matthew Morris"
                            },
                            "value": "88"
                        },
                        {
                            "display": {
                                "-xml:lang": "x-default",
                                "#text": "Mattison Perron"
                            },
                            "value": "89"
                        },
                        {
                            "display": {
                                "-xml:lang": "x-default",
                                "#text": "Melissa Taylor"
                            },
                            "value": "90"
                        },
                        {
                            "display": {
                                "-xml:lang": "x-default",
                                "#text": "Michael Mejia"
                            },
                            "value": "91"
                        },
                        {
                            "display": {
                                "-xml:lang": "x-default",
                                "#text": "Michelle Lindsay"
                            },
                            "value": "92"
                        },
                        {
                            "display": {
                                "-xml:lang": "x-default",
                                "#text": "Michelle O'Connor"
                            },
                            "value": "93"
                        },
                        {
                            "display": {
                                "-xml:lang": "x-default",
                                "#text": "Michelle Patton"
                            },
                            "value": "94"
                        },
                        {
                            "display": {
                                "-xml:lang": "x-default",
                                "#text": "Mikey Denton"
                            },
                            "value": "95"
                        },
                        {
                            "display": {
                                "-xml:lang": "x-default",
                                "#text": "Min Kim"
                            },
                            "value": "96"
                        },
                        {
                            "display": {
                                "-xml:lang": "x-default",
                                "#text": "Nancy Braun"
                            },
                            "value": "97"
                        },
                        {
                            "display": {
                                "-xml:lang": "x-default",
                                "#text": "Nick Arrojo"
                            },
                            "value": "98"
                        },
                        {
                            "display": {
                                "-xml:lang": "x-default",
                                "#text": "Nick Stenson"
                            },
                            "value": "99"
                        },
                        {
                            "display": {
                                "-xml:lang": "x-default",
                                "#text": "Nicole Vince"
                            },
                            "value": "100"
                        },
                        {
                            "display": {
                                "-xml:lang": "x-default",
                                "#text": "Nikki Lee"
                            },
                            "value": "101"
                        },
                        {
                            "display": {
                                "-xml:lang": "x-default",
                                "#text": "Nishita Naga"
                            },
                            "value": "102"
                        },
                        {
                            "display": {
                                "-xml:lang": "x-default",
                                "#text": "Patricia Rodriguez"
                            },
                            "value": "103"
                        },
                        {
                            "display": {
                                "-xml:lang": "x-default",
                                "#text": "Pekela Riley"
                            },
                            "value": "104"
                        },
                        {
                            "display": {
                                "-xml:lang": "x-default",
                                "#text": "Pepper Pastor"
                            },
                            "value": "105"
                        },
                        {
                            "display": {
                                "-xml:lang": "x-default",
                                "#text": "Philip Wolff"
                            },
                            "value": "106"
                        },
                        {
                            "display": {
                                "-xml:lang": "x-default",
                                "#text": "Philip Wolff"
                            },
                            "value": "107"
                        },
                        {
                            "display": {
                                "-xml:lang": "x-default",
                                "#text": "Rachelle Hawkins"
                            },
                            "value": "108"
                        },
                        {
                            "display": {
                                "-xml:lang": "x-default",
                                "#text": "Rickey Zito"
                            },
                            "value": "109"
                        },
                        {
                            "display": {
                                "-xml:lang": "x-default",
                                "#text": "Rodney Cutler"
                            },
                            "value": "110"
                        },
                        {
                            "display": {
                                "-xml:lang": "x-default",
                                "#text": "Ruth Roche"
                            },
                            "value": "111"
                        },
                        {
                            "display": {
                                "-xml:lang": "x-default",
                                "#text": "Ryan Pearl"
                            },
                            "value": "112"
                        },
                        {
                            "display": {
                                "-xml:lang": "x-default",
                                "#text": "Sam Villa"
                            },
                            "value": "113"
                        },
                        {
                            "display": {
                                "-xml:lang": "x-default",
                                "#text": "Samuel Shriqui"
                            },
                            "value": "114"
                        },
                        {
                            "display": {
                                "-xml:lang": "x-default",
                                "#text": "Sarah Bondoc"
                            },
                            "value": "115"
                        },
                        {
                            "display": {
                                "-xml:lang": "x-default",
                                "#text": "Sarah Healy"
                            },
                            "value": "116"
                        },
                        {
                            "display": {
                                "-xml:lang": "x-default",
                                "#text": "Sean Godard"
                            },
                            "value": "117"
                        },
                        {
                            "display": {
                                "-xml:lang": "x-default",
                                "#text": "Sebastian Langman-Kirtley"
                            },
                            "value": "118"
                        },
                        {
                            "display": {
                                "-xml:lang": "x-default",
                                "#text": "Selina McManus"
                            },
                            "value": "119"
                        },
                        {
                            "display": {
                                "-xml:lang": "x-default",
                                "#text": "Shannon VanFleet"
                            },
                            "value": "120"
                        },
                        {
                            "display": {
                                "-xml:lang": "x-default",
                                "#text": "Shelby Maguire"
                            },
                            "value": "121"
                        },
                        {
                            "display": {
                                "-xml:lang": "x-default",
                                "#text": "Soleil Guerrero"
                            },
                            "value": "122"
                        },
                        {
                            "display": {
                                "-xml:lang": "x-default",
                                "#text": "Sophia Emmanuel"
                            },
                            "value": "123"
                        },
                        {
                            "display": {
                                "-xml:lang": "x-default",
                                "#text": "Stephanie Nolan"
                            },
                            "value": "124"
                        },
                        {
                            "display": {
                                "-xml:lang": "x-default",
                                "#text": "Theresa Adams"
                            },
                            "value": "125"
                        },
                        {
                            "display": {
                                "-xml:lang": "x-default",
                                "#text": "Tiffinie Morton"
                            },
                            "value": "126"
                        },
                        {
                            "display": {
                                "-xml:lang": "x-default",
                                "#text": "Tracey Cunningham"
                            },
                            "value": "127"
                        },
                        {
                            "display": {
                                "-xml:lang": "x-default",
                                "#text": "Travis Parker"
                            },
                            "value": "128"
                        },
                        {
                            "display": {
                                "-xml:lang": "x-default",
                                "#text": "Travis Valdez"
                            },
                            "value": "129"
                        },
                        {
                            "display": {
                                "-xml:lang": "x-default",
                                "#text": "Whitney VerMeer"
                            },
                            "value": "130"
                        },
                        {
                            "display": {
                                "-xml:lang": "x-default",
                                "#text": "Wura Kolawole"
                            },
                            "value": "131"
                        },
                        {
                            "display": {
                                "-xml:lang": "x-default",
                                "#text": "Yvonne Daly"
                            },
                            "value": "132"
                        }
                    ]
                }
            }
        }
        this._tags = {
            "attribute-definition": {
                "-attribute-id": "contentTags",
                "display-name": {
                    "-xml:lang": "x-default",
                    "#text": "Article's Tags"
                },
                "description": {
                    "-xml:lang": "x-default",
                    "#text": "Article's Tags"
                },
                "type": "enum-of-string",
                "localizable-flag": "false",
                "mandatory-flag": "false",
                "externally-managed-flag": "false",
                "select-multiple-flag": "true",
                "value-definitions": {
                    "value-definition": [{
                            "display": {
                                "-xml:lang": "x-default",
                                "#text": "Brunette"
                            },
                            "value": "brunette"
                        },
                        {
                            "display": {
                                "-xml:lang": "x-default",
                                "#text": "Healthy hair"
                            },
                            "value": "healthy-hair"
                        },
                        {
                            "display": {
                                "-xml:lang": "x-default",
                                "#text": "Hair Treatments"
                            },
                            "value": "hair-treatments"
                        },
                        {
                            "display": {
                                "-xml:lang": "x-default",
                                "#text": "Festival"
                            },
                            "value": "festival"
                        },
                        {
                            "display": {
                                "-xml:lang": "x-default",
                                "#text": "All Over Color"
                            },
                            "value": "all-over-color"
                        },
                        {
                            "display": {
                                "-xml:lang": "x-default",
                                "#text": "Styling"
                            },
                            "value": "styling"
                        },
                        {
                            "display": {
                                "-xml:lang": "x-default",
                                "#text": "Artist"
                            },
                            "value": "artist"
                        },
                        {
                            "display": {
                                "-xml:lang": "x-default",
                                "#text": "Professional Looks"
                            },
                            "value": "professional-looks"
                        },
                        {
                            "display": {
                                "-xml:lang": "x-default",
                                "#text": "Salon"
                            },
                            "value": "salon"
                        },
                        {
                            "display": {
                                "-xml:lang": "x-default",
                                "#text": "Celebrity Hairstyles"
                            },
                            "value": "celebrity-hairstyles"
                        },
                        {
                            "display": {
                                "-xml:lang": "x-default",
                                "#text": "Wavy Hair"
                            },
                            "value": "wavy-hair"
                        },
                        {
                            "display": {
                                "-xml:lang": "x-default",
                                "#text": "Popular Hairstyles"
                            },
                            "value": "popular-hairstyles"
                        },
                        {
                            "display": {
                                "-xml:lang": "x-default",
                                "#text": "How To"
                            },
                            "value": "how-to"
                        },
                        {
                            "display": {
                                "-xml:lang": "x-default",
                                "#text": "Short Hair"
                            },
                            "value": "short-hair"
                        },
                        {
                            "display": {
                                "-xml:lang": "x-default",
                                "#text": "Bob Hairstyles"
                            },
                            "value": "bob-hairstyles"
                        },
                        {
                            "display": {
                                "-xml:lang": "x-default",
                                "#text": "Trending Styles"
                            },
                            "value": "trending-styles"
                        },
                        {
                            "display": {
                                "-xml:lang": "x-default",
                                "#text": "Haircuts"
                            },
                            "value": "haircuts"
                        },
                        {
                            "display": {
                                "-xml:lang": "x-default",
                                "#text": "Trending Colors"
                            },
                            "value": "trending-colors"
                        },
                        {
                            "display": {
                                "-xml:lang": "x-default",
                                "#text": "Trending Cuts"
                            },
                            "value": "trending-cuts"
                        },
                        {
                            "display": {
                                "-xml:lang": "x-default",
                                "#text": "Pixie"
                            },
                            "value": "pixie"
                        },
                        {
                            "display": {
                                "-xml:lang": "x-default",
                                "#text": "Bangs"
                            },
                            "value": "bangs"
                        },
                        {
                            "display": {
                                "-xml:lang": "x-default",
                                "#text": "Cute Hairstyles"
                            },
                            "value": "cute-hairstyles"
                        },
                        {
                            "display": {
                                "-xml:lang": "x-default",
                                "#text": "Colorful Hair"
                            },
                            "value": "colorful-hair"
                        },
                        {
                            "display": {
                                "-xml:lang": "x-default",
                                "#text": "Highlights"
                            },
                            "value": "highlights"
                        },
                        {
                            "display": {
                                "-xml:lang": "x-default",
                                "#text": "Balayage"
                            },
                            "value": "balayage"
                        },
                        {
                            "display": {
                                "-xml:lang": "x-default",
                                "#text": "Color Treated"
                            },
                            "value": "color-treated"
                        },
                        {
                            "display": {
                                "-xml:lang": "x-default",
                                "#text": "Long Hair"
                            },
                            "value": "long-hair"
                        },
                        {
                            "display": {
                                "-xml:lang": "x-default",
                                "#text": "Medium Hair"
                            },
                            "value": "medium-hair"
                        },
                        {
                            "display": {
                                "-xml:lang": "x-default",
                                "#text": "Vintage Hair"
                            },
                            "value": "vintage-hair"
                        },
                        {
                            "display": {
                                "-xml:lang": "x-default",
                                "#text": "Natural Hair"
                            },
                            "value": "natural-hair"
                        },
                        {
                            "display": {
                                "-xml:lang": "x-default",
                                "#text": "Ponytails"
                            },
                            "value": "ponytails"
                        },
                        {
                            "display": {
                                "-xml:lang": "x-default",
                                "#text": "Sleek Hair"
                            },
                            "value": "sleek-hair"
                        },
                        {
                            "display": {
                                "-xml:lang": "x-default",
                                "#text": "Men"
                            },
                            "value": "men"
                        },
                        {
                            "display": {
                                "-xml:lang": "x-default",
                                "#text": "Halloween"
                            },
                            "value": "halloween"
                        },
                        {
                            "display": {
                                "-xml:lang": "x-default",
                                "#text": "Extensions"
                            },
                            "value": "extensions"
                        },
                        {
                            "display": {
                                "-xml:lang": "x-default",
                                "#text": "Scalp Care"
                            },
                            "value": "scalp-care"
                        },
                        {
                            "display": {
                                "-xml:lang": "x-default",
                                "#text": "Coarse Hair"
                            },
                            "value": "coarse-hair"
                        },
                        {
                            "display": {
                                "-xml:lang": "x-default",
                                "#text": "Curly Hair"
                            },
                            "value": "curly-hair"
                        },
                        {
                            "display": {
                                "-xml:lang": "x-default",
                                "#text": "Dry Hair"
                            },
                            "value": "dry-hair"
                        },
                        {
                            "display": {
                                "-xml:lang": "x-default",
                                "#text": "Black Hair"
                            },
                            "value": "black-hair"
                        },
                        {
                            "display": {
                                "-xml:lang": "x-default",
                                "#text": "Mohawk"
                            },
                            "value": "mohawk"
                        },
                        {
                            "display": {
                                "-xml:lang": "x-default",
                                "#text": "Wet Look"
                            },
                            "value": "wet-look"
                        },
                        {
                            "display": {
                                "-xml:lang": "x-default",
                                "#text": "Wet Look"
                            },
                            "value": "wet-look"
                        },
                        {
                            "display": {
                                "-xml:lang": "x-default",
                                "#text": "Natural Hairstyles"
                            },
                            "value": "natural-hairstyles"
                        },
                        {
                            "display": {
                                "-xml:lang": "x-default",
                                "#text": "Updos"
                            },
                            "value": "updos"
                        },
                        {
                            "display": {
                                "-xml:lang": "x-default",
                                "#text": "Layered Hair"
                            },
                            "value": "layered-hair"
                        },
                        {
                            "display": {
                                "-xml:lang": "x-default",
                                "#text": "Party Looks"
                            },
                            "value": "party-looks"
                        },
                        {
                            "display": {
                                "-xml:lang": "x-default",
                                "#text": "Braids"
                            },
                            "value": "braids"
                        },
                        {
                            "display": {
                                "-xml:lang": "x-default",
                                "#text": "Fine Hair"
                            },
                            "value": "fine-hair"
                        },
                        {
                            "display": {
                                "-xml:lang": "x-default",
                                "#text": "Shampoo"
                            },
                            "value": "shampoo"
                        },
                        {
                            "display": {
                                "-xml:lang": "x-default",
                                "#text": "Cleansing"
                            },
                            "value": "cleansing"
                        },
                        {
                            "display": {
                                "-xml:lang": "x-default",
                                "#text": "Hair Creams and Lotions"
                            },
                            "value": "hair-creams-and-lotions"
                        },
                        {
                            "display": {
                                "-xml:lang": "x-default",
                                "#text": "Conditioner"
                            },
                            "value": "conditioner"
                        },
                        {
                            "display": {
                                "-xml:lang": "x-default",
                                "#text": "Frizzy Hair"
                            },
                            "value": "frizzy-hair"
                        },
                        {
                            "display": {
                                "-xml:lang": "x-default",
                                "#text": "Hair Masks"
                            },
                            "value": "hair-masks"
                        },
                        {
                            "display": {
                                "-xml:lang": "x-default",
                                "#text": "Hair Oil"
                            },
                            "value": "hair-oil"
                        },
                        {
                            "display": {
                                "-xml:lang": "x-default",
                                "#text": "Hair Serum"
                            },
                            "value": "hair-serum"
                        },
                        {
                            "display": {
                                "-xml:lang": "x-default",
                                "#text": "Thick Hair"
                            },
                            "value": "thick-hair"
                        },
                        {
                            "display": {
                                "-xml:lang": "x-default",
                                "#text": "Gray Hair"
                            },
                            "value": "gray-hair"
                        },
                        {
                            "display": {
                                "-xml:lang": "x-default",
                                "#text": "Hairstyles for Men"
                            },
                            "value": "hairstyles-for-men"
                        },
                        {
                            "display": {
                                "-xml:lang": "x-default",
                                "#text": "Products for Men"
                            },
                            "value": "products-for-men"
                        },
                        {
                            "display": {
                                "-xml:lang": "x-default",
                                "#text": "Temporary Color"
                            },
                            "value": "temporary-color"
                        },
                        {
                            "display": {
                                "-xml:lang": "x-default",
                                "#text": "Fringe"
                            },
                            "value": "fringe"
                        },
                        {
                            "display": {
                                "-xml:lang": "x-default",
                                "#text": "Christmas"
                            },
                            "value": "christmas"
                        },
                        {
                            "display": {
                                "-xml:lang": "x-default",
                                "#text": "Pomade"
                            },
                            "value": "pomade"
                        },
                        {
                            "display": {
                                "-xml:lang": "x-default",
                                "#text": "Grooming and Beards"
                            },
                            "value": "grooming-and-beards"
                        },
                        {
                            "display": {
                                "-xml:lang": "x-default",
                                "#text": "Red"
                            },
                            "value": "red"
                        },
                        {
                            "display": {
                                "-xml:lang": "x-default",
                                "#text": "Gift Ideas"
                            },
                            "value": "gift-ideas"
                        },
                        {
                            "display": {
                                "-xml:lang": "x-default",
                                "#text": "Messy Hairstyles"
                            },
                            "value": "messy-hairstyles"
                        },
                        {
                            "display": {
                                "-xml:lang": "x-default",
                                "#text": "Chemically Treated Hair"
                            },
                            "value": "chemically-treated-hair"
                        },
                        {
                            "display": {
                                "-xml:lang": "x-default",
                                "#text": "Lowlights"
                            },
                            "value": "lowlights"
                        },
                        {
                            "display": {
                                "-xml:lang": "x-default",
                                "#text": "Damaged Hair"
                            },
                            "value": "damaged-hair"
                        },
                        {
                            "display": {
                                "-xml:lang": "x-default",
                                "#text": "Pastels"
                            },
                            "value": "pastels"
                        },
                        {
                            "display": {
                                "-xml:lang": "x-default",
                                "#text": "Thinning Hair"
                            },
                            "value": "thinning-hair"
                        },
                        {
                            "display": {
                                "-xml:lang": "x-default",
                                "#text": "Heart Shaped Face"
                            },
                            "value": "heart-shaped-face"
                        },
                        {
                            "display": {
                                "-xml:lang": "x-default",
                                "#text": "Oval Face Shape"
                            },
                            "value": "oval-face-shape"
                            
                        },
                        {
                            "display": {
                                "-xml:lang": "x-default",
                                "#text": "Round Face Shpe"
                            },
                            "value": "round-face-shape"
                        },
                        {
                            "display": {
                                "-xml:lang": "x-default",
                                "#text": "Square Face Shape"
                            },
                            "value": "square-face-shape"
                        },
                        {
                            "display": {
                                "-xml:lang": "x-default",
                                "#text": "Diamond Face Shape"
                            },
                            "value": "diamond-face-shape"
                        },
                        {
                            "display": {
                                "-xml:lang": "x-default",
                                "#text": "Rainbow Hair"
                            },
                            "value": "rainbow-hair"
                        },
                        {
                            "display": {
                                "-xml:lang": "x-default",
                                "#text": "Buns"
                            },
                            "value": "buns"
                        },
                        {
                            "display": {
                                "-xml:lang": "x-default",
                                "#text": "Buns"
                            },
                            "value": "buns"
                        },
                        {
                            "display": {
                                "-xml:lang": "x-default",
                                "#text": "Wedding Looks"
                            },
                            "value": "wedding-looks"
                        }
                    ]
                }
            }
        }
        this._customAttribute = [ { _: 'false', '$': { 'attribute-id': 'editorialPage' } },
        { _: 'false', '$': { 'attribute-id': 'isVisible' } },
        { _: '{"tileConfigId": "blog"}',
          '$': { 'attribute-id': 'jsonData', 'xml:lang': 'x-default' } },
        { _: 'false', '$': { 'attribute-id': 'pageNoFollow' } },
        { _: 'false', '$': { 'attribute-id': 'pageNoIndex' } },
        { _: 'false', '$': { 'attribute-id': 'showInMenu' } },
        { _: 'false', '$': { 'attribute-id': 'uniqueSearchTemplate' } } ]
    }

    readXMLfile(fileName) {
        let parser = new xml2js.Parser();
        let that = this;
        fs.readFile(__dirname + '/' + this._fileName, function(err, data) {
            parser.parseString(data, function(err, result) {
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

    processContent() {
        let that = this;
        
        this._parsedObject.library.folder = _.filter(this._parsedObject.library.folder, o => {
            return that._addContent(o, 'folder-id');
        });
        this._createFolders(that._authors, 'author');
        this._createFolders(that._tags, 'tag');

        this._parsedObject.library.content = _.filter(this._parsedObject.library.content, o => {
            return that._addContent(o, 'content-id');
        });

        this._parsedObject.library.content = _.map(this._parsedObject.library.content, o => {
            let authorId  = _.filter(o['custom-attributes'][0]['custom-attribute'], a => {
               return a.$['attribute-id'] === 'contentAuthor';
            });
            if (authorId.length) {
                let authorObj = _.filter(this._authors['attribute-definition']['value-definitions']['value-definition'], a => {
                    return a.value == authorId[0]['_'];
                });
            
                let authorValue = authorObj[0].display['#text'].replace(/ +/g, '-').toLowerCase();
                o['folder-links'][0]['folder-link'].push({'$' : {'folder-id' :  'author'.concat('-',authorValue) } });
            }
            
            let tagsArray  = _.filter(o['custom-attributes'][0]['custom-attribute'], a => {
                return a.$['attribute-id'] === 'contentTags';
            });
            if (tagsArray.length) {
                tagsArray[0].value.forEach(tag => {
                    o['folder-links'][0]['folder-link'].push({'$' : {'folder-id' :  'tag'.concat('-',tag) } });
                })
            }
               
            return o;
        });
    }

    _createFolders(obj, attribute) {
        this._parsedObject.library.folder.push({ 
            '$': { 'folder-id': attribute.concat('s') },
            'display-name': [ { _: attribute.concat('s'), '$': { 'xml:lang': 'x-default' } } ],
            'online-flag': [ 'true' ],
            template: [ 'containers/blog/contentcategory' ],
            parent: [ 'root' ],
            'custom-attributes': [ { 'custom-attribute': this._customAttribute } ],
            'sitemap-included-flag': [ 'false' ]
        });
        obj['attribute-definition']['value-definitions']['value-definition'].forEach(element => {
            this._parsedObject.library.folder.push({ 
                '$': { 'folder-id': attribute.concat('-', element.display['#text'].replace(/ +/g, '-').toLowerCase()) },
                'display-name': [ { _: element.display['#text'], '$': { 'xml:lang': 'x-default' } } ],
                'online-flag': [ 'true' ],
                template: [ 'containers/blog/contentcategory' ],
                parent: [ attribute.concat('s') ],
                'custom-attributes': [ { 'custom-attribute': this._customAttribute } ],
                'sitemap-included-flag': [ 'false' ]
            });
        });
    }

    _createFoldersTags(obj) {
        this._parsedObject.library.folder.push({ 
            '$': { 'folder-id': 'tags' },
            'display-name': [ { _: 'Tags', '$': { 'xml:lang': 'x-default' } } ],
            'online-flag': [ 'true' ],
            template: [ 'containers/blog/contentcategory' ],
            parent: [ 'root' ],
            'custom-attributes': [ { 'custom-attribute': this._customAttribute } ],
            'sitemap-included-flag': [ 'false' ]
        });
        obj['attribute-definition']['value-definitions']['value-definition'].forEach(element => {
            this._parsedObject.library.folder.push({ 
                '$': { 'folder-id': 'tags-'.concat(element.display['#text'].replace(/ +/g, '-').toLowerCase()) },
                'display-name': [ { _: element.display['#text'], '$': { 'xml:lang': 'x-default' } } ],
                'online-flag': [ 'true' ],
                template: [ 'containers/blog/contentcategory' ],
                parent: [ 'tags' ],
                'custom-attributes': [ { 'custom-attribute': this._customAttribute } ],
                'sitemap-included-flag': [ 'false' ]
            });
        });
    }

    _addContent(o, key) {
        if (
            o['folder-links'] &&
            o['folder-links'][0] &&
            o['folder-links'][0]['classification-link'] &&
            o['folder-links'][0]['classification-link'][0] &&
            o['folder-links'][0]['classification-link'][0]['$']['folder-id'] === 'blog') {
            return true;
        }

        return false;
    }

    getContentParentFolder() {

    }

    exportNewXML() {
        let builder = new xml2js.Builder();
        let xml = builder.buildObject(this._parsedObject);
        fs.writeFileSync('newBlog.xml', xml);
    }
}

let obj = new CAExoportParser();
obj.run(process.argv[2], process.argv[3]);