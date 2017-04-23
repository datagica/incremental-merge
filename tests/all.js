const chai = require('chai');
chai.use(require('chai-fuzzy'));
const expect = chai.expect;

const util = require('util');
const pretty = (x) => {
  console.log(util.inspect(x, false, 7, true));
};

const imerge = require("../lib/index");

describe('@datagica/incremental-merge', () => {

  it('should incrementally merge a trivial object', () => {

    const original = {
      "should-change": "foo",
      "should-also-change": "bar",
      "should-not-change": "foo bar"
   }

   const patch = {
     "should-change": "baz",
     "should-also-change": "foobar",
     "should-not-change": "foobar",
     "should-be-added": "hello world"
   }

   const expected = {
     "should-change": "baz",
     "should-also-change": "foobar",
     "should-not-change": "foo bar",
     "should-be-added": "hello world"
   }

   const output = imerge(original, patch)

   expect(output).to.be.like(expected)

  })


  it('should incrementally merge a real-world object', () => {

    const original = {
      "settings": {
        "parameters": {
          "label": {
            "en": "Settings",
            "fr": "Paramètres"
          },
          "type": "group",
          "value": {
            "files": {
              "label": {
                "en": "Files",
                "fr": "Fichiers"
              },
              // ABSENT //////////////
              //"type": "filelist",
              ////////////////////////

              // EMPTY ///////////////
              "value": [
                // "test.pdf"
              ]
              ////////////////////////
            }
          }
        }
      },
      "sourceId": "b4b5fa19-58c9-4e04-a156-f3298d845e95"
    }

   const patch = {

     // ADDED ////////////////////
     "bundleId": "file",
     "templateId": "local",
     "sourceName": "magic",
     "isActive": true,
     /////////////////////////////

     "settings": {
       "parameters": {
         "label": {
           "en": "Settings",
           "fr": "Paramètres"
         },

         // ABSENT ////////////
         //"type": "group",
         //////////////////////

         "value": {
           "files": {
             "label": {
               "en": "Files",
               "fr": "Fichiers"
             },
             // NEW ////
             "type": "filelist",
             "value": [
               "test.pdf"
             ]
             /////////////////
           }
         }
       }
     },
     "sourceId": "b4b5fa19-58c9-4e04-a156-f3298d845e95"
   }

   const expected = {
     "bundleId": "file",
     "templateId": "local",
     "sourceName": "magic",
     "isActive": true,
     "settings": {
       "parameters": {
         "label": {
           "en": "Settings",
           "fr": "Paramètres"
         },
         "type": "group",
         "value": {
           "files": {
             "label": {
               "en": "Files",
               "fr": "Fichiers"
             },
             "type": "filelist",
             "value": [
               "test.pdf"
             ]
           }
         }
       }
     },
     "sourceId": "b4b5fa19-58c9-4e04-a156-f3298d845e95"
   }

   const output = imerge(original, patch)

   expect(output).to.be.like(expected)

  })

})
