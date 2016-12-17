'use strict';
/**
 * define require module
 * @module  express,jsonwebtoken
 */
let express = require('express'),
    router = express.Router(),
    jwt = require('jsonwebtoken'),
    secret = "eb532154d1c60fe3c035de06c30ad96e6d36af93";

/**
 * github authentication using jsonwebtoken
 * @param      {String} --github clientID
 * @return     {json} --return json format token
 */
router.post('/github', function(req, res) {
    let clientId = req.body.clientId;
    var token = jwt.sign(clientId, secret);
    res.json({ token: token });
});

/**
 * When user login with again it verify with token
 * @param      {String} --user send token
 * @return     {json} --return json formated string
 */
router.post('/verify', function(req, res) {
    var token = req.body.token || req.query.token || req.headers['x-access-token'];
    if (token) {
        jwt.verify(token, secret, function(err, decoded) {
            if (err) {
                res.json({
                    success: false,
                    message: 'failed to authenticate token'
                });
            } else {
                res.json({
                    message: 'successfully authentication process',
                    result: decoded
                });
            }
        });
    } else {
        res.status(403).send({
            success: false,
            message: 'No token provide...'
        });
    }
});
router.post('/demo', function(req, res) {
    var data={
  "s": 1,
  "m": "HomePage Details",
  "d": {
    "widgets": [
      {
        "tillDate": "2017-03-17 08:00:00",
        "elements": [
          {
            "type": "image",
            "data": {
              "aspectRatio": {
                "width": 375,
                "height": 138
              },
              "altText": "Launching Avanya For the Elegant You",
              "target": {
                "url": "http://www.craftsvilla.com/cvfeeds/avanya#feedid=2223&pageId=1&",
                "header": ""
              },
              "imgURL": "http://assets1.craftsvilla.com/banner-craftsvilla/cvfeeds/1480684554_avanya_021216_hero_newapp.jpg",
              "title": ""
            },
            "MID": "App_HP_Hero_1_1_LaunchingAvanya"
          },
          {
            "type": "image",
            "data": {
              "aspectRatio": {
                "width": 375,
                "height": 138
              },
              "altText": "Bright Anarkalis From 999",
              "target": {
                "url": "http://www.craftsvilla.com/cvfeeds/anarkalis-sangeet-craftsvilla#feedid=1254&pageId=1&",
                "header": ""
              },
              "imgURL": "http://assets1.craftsvilla.com/banner-craftsvilla/cvfeeds/1480513163_brightanarkalis999_301116_hero_newapp.jpg",
              "title": ""
            },
            "MID": "App_HP_Hero_1_2_BrightAnarkalisFrom999"
          },
          {
            "type": "image",
            "data": {
              "aspectRatio": {
                "width": 375,
                "height": 138
              },
              "altText": "Latest Gowns From 799",
              "target": {
                "url": "http://www.craftsvilla.com/cvfeeds/latest-gowns-craftsvilla#feedid=1034&pageId=1&",
                "header": ""
              },
              "imgURL": "http://assets1.craftsvilla.com/banner-craftsvilla/cvfeeds/1480513210_latestgowns799__301116_hero_newapp.jpg",
              "title": ""
            },
            "MID": "App_HP_Hero_1_3_LatestGownsFrom799"
          },
          {
            "type": "image",
            "data": {
              "aspectRatio": {
                "width": 375,
                "height": 138
              },
              "altText": "Embroidered Sarees Under 1999",
              "target": {
                "url": "http://www.craftsvilla.com/cvfeeds/bestselling-embroidered-sarees#feedid=1110&pageId=1&",
                "header": ""
              },
              "imgURL": "http://assets1.craftsvilla.com/banner-craftsvilla/cvfeeds/1480513194_embroideredsarees1999_301116_hero_newapp.jpg",
              "title": ""
            },
            "MID": "App_HP_Hero_1_4_EmbroideredSareesUnder1999"
          }
        ],
        "title": "",
        "isTimerEnabled": false,
        "fromDate": "2016-09-27 04:00:00",
        "dataSource": {
          "url": "",
          "elementCount": null,
          "type": null
        },
        "type": "carousal",
        "display": {
          "columns": "1",
          "row": "1"
        },
        "more": null
      },
      {
        "tillDate": "2017-10-31 17:30:00",
        "elements": [],
        "title": "Track Order",
        "isTimerEnabled": false,
        "fromDate": "2016-10-02 17:30:00",
        "dataSource": {
          "url": "",
          "elementCount": null,
          "type": null
        },
        "type": "track",
        "display": {
          "columns": "1",
          "row": "1"
        },
        "more": null
      },
      {
        "tillDate": "2017-10-31 17:30:00",
        "elements": [
          {
            "type": "imageText",
            "data": {
              "aspectRatio": {
                "width": 1,
                "height": 1
              },
              "altText": "Sarees",
              "target": {
                "url": "http://www.craftsvilla.com/csf/id/sarees",
                "header": ""
              },
              "imgURL": "https://s3-ap-southeast-1.amazonaws.com/assets1.craftsvilla.com/AppLaunch/home_page_assets/3_Category_icons/sarees.png",
              "title": "Sarees"
            },
            "MID": "App_HP_Category_2_1_sarees"
          },
          {
            "type": "imageText",
            "data": {
              "aspectRatio": {
                "width": 1,
                "height": 1
              },
              "altText": "Casual Wear",
              "target": {
                "url": "http://www.craftsvilla.com/csf/id/casualwear",
                "header": ""
              },
              "imgURL": "https://s3-ap-southeast-1.amazonaws.com/assets1.craftsvilla.com/AppLaunch/home_page_assets/3_Category_icons/casual_wear.png",
              "title": "Casual Wear"
            },
            "MID": "App_HP_Category_2_2_casualwear"
          },
          {
            "type": "imageText",
            "data": {
              "aspectRatio": {
                "width": 1,
                "height": 1
              },
              "altText": "Salwar Suits",
              "target": {
                "url": "http://www.craftsvilla.com/csf/id/salwarsuits",
                "header": ""
              },
              "imgURL": "https://s3-ap-southeast-1.amazonaws.com/assets1.craftsvilla.com/AppLaunch/home_page_assets/3_Category_icons/salwar_suits.png",
              "title": "Salwar Suits"
            },
            "MID": "App_HP_Category_2_3_salwarsuits"
          },
          {
            "type": "imageText",
            "data": {
              "aspectRatio": {
                "width": 1,
                "height": 1
              },
              "altText": "Lehengas",
              "target": {
                "url": "http://www.craftsvilla.com/csf/id/lehengas",
                "header": ""
              },
              "imgURL": "https://s3-ap-southeast-1.amazonaws.com/assets1.craftsvilla.com/AppLaunch/home_page_assets/3_Category_icons/Lehenga.png",
              "title": "Lehengas"
            },
            "MID": "App_HP_Category_2_4_lehengas"
          },
          {
            "type": "imageText",
            "data": {
              "aspectRatio": {
                "width": 1,
                "height": 1
              },
              "altText": "Jewellery",
              "target": {
                "url": "http://www.craftsvilla.com/csf/id/jewellery",
                "header": ""
              },
              "imgURL": "https://s3-ap-southeast-1.amazonaws.com/assets1.craftsvilla.com/AppLaunch/home_page_assets/3_Category_icons/accessories.png",
              "title": "Jewellery"
            },
            "MID": "App_HP_Category_2_5_jewellery"
          },
          {
            "type": "imageText",
            "data": {
              "aspectRatio": {
                "width": 1,
                "height": 1
              },
              "altText": "Home Decor",
              "target": {
                "url": "http://www.craftsvilla.com/csf/id/homedecor",
                "header": ""
              },
              "imgURL": "https://s3-ap-southeast-1.amazonaws.com/assets1.craftsvilla.com/AppLaunch/home_page_assets/3_Category_icons/home_decor.png",
              "title": "Home Decor"
            },
            "MID": "App_HP_Category_2_6_homedecor"
          },
          {
            "type": "imageText",
            "data": {
              "aspectRatio": {
                "width": 1,
                "height": 1
              },
              "altText": "Mens Wear",
              "target": {
                "url": "http://www.craftsvilla.com/csf/id/menswear",
                "header": ""
              },
              "imgURL": "https://s3-ap-southeast-1.amazonaws.com/assets1.craftsvilla.com/AppLaunch/home_page_assets/3_Category_icons/men%27s+fashion.png",
              "title": "Men's Fashion"
            },
            "MID": "App_HP_Category_2_7_menswear"
          },
          {
            "type": "imageText",
            "data": {
              "aspectRatio": {
                "width": 1,
                "height": 1
              },
              "altText": "Beauty Products",
              "target": {
                "url": "http://www.craftsvilla.com/csf/id/beautyproducts",
                "header": ""
              },
              "imgURL": "https://s3-ap-southeast-1.amazonaws.com/assets1.craftsvilla.com/AppLaunch/home_page_assets/3_Category_icons/beauty.png",
              "title": "Beauty"
            },
            "MID": "App_HP_Category_2_8_beautyproducts"
          }
        ],
        "title": "Shop by Category",
        "isTimerEnabled": false,
        "fromDate": "2016-08-31 18:30:00",
        "dataSource": {
          "url": "",
          "elementCount": null,
          "type": null
        },
        "type": "fixed",
        "display": {
          "columns": "4",
          "row": "2"
        },
        "more": null
      },
      {
        "tillDate": "2017-12-31 17:30:00",
        "elements": [
          {
            "type": "image",
            "data": {
              "aspectRatio": {
                "width": 720,
                "height": 264
              },
              "altText": "The Wedding Store",
              "target": {
                "url": "http://www.craftsvilla.com/csf/id/weddingstore",
                "header": ""
              },
              "imgURL": "http://assets1.craftsvilla.com/banner-craftsvilla/cvfeeds/1480418458_theweddingstore_291116_tile_newapp.jpg",
              "title": ""
            },
            "MID": "App_HP_Campaign_5_1_TheWeddingStore"
          }
        ],
        "title": "",
        "isTimerEnabled": false,
        "fromDate": "2016-10-31 18:30:00",
        "dataSource": {
          "url": "",
          "elementCount": null,
          "type": null
        },
        "type": "fixed",
        "display": {
          "columns": "1",
          "row": "1"
        },
        "more": null
      },
      {
        "tillDate": "2017-09-05 20:16:00",
        "elements": [],
        "title": "Recently Viewed",
        "isTimerEnabled": false,
        "fromDate": "2016-09-04 20:00:00",
        "dataSource": {
          "api_meta": {},
          "elementCount": 30,
          "type": "api",
          "url": "https://appapi2.craftsvilla.com/1/public/catalog/productList",
          "payload": {
            "query_params": [
              {
                "default": null,
                "key": "productIds"
              }
            ]
          }
        },
        "type": "slider",
        "display": {
          "columns": "3",
          "row": "1"
        },
        "more": {
          "type": "widget",
          "data": {
            "body": "",
            "target": {
              "url": "https://appapi2.craftsvilla.com/1/public/catalog/productList",
              "header": ""
            },
            "type": "text",
            "MID": "App_HP_RecentlyViewed_3_1_RecentlyViewedProducts",
            "title": "View All"
          }
        }
      },
      {
        "tillDate": "2017-09-05 20:16:00",
        "elements": [],
        "title": "Omniture",
        "isTimerEnabled": false,
        "fromDate": "2016-09-04 20:00:00",
        "dataSource": {
          "api_meta": {
            "personalise_rank": 1,
            "group_by": "personalisation"
          },
          "elementCount": 30,
          "type": "clubbed_api",
          "url": "172.30.0.4:8000/personalisation/v1",
          "payload": {
            "query_params": [
              {
                "default": 0,
                "key": "v"
              },
              {
                "default": null,
                "key": "adobe_id"
              },
              {
                "default": null,
                "key": "widget"
              }
            ]
          }
        },
        "type": "slider",
        "display": {
          "columns": "3",
          "row": "1"
        },
        "more": {
          "type": "widget",
          "data": {
            "body": "",
            "target": {
              "url": "172.30.0.4:8000/personalisation/v1?adobe_id=%%omnitureid%%&widgets=1&v=1",
              "header": ""
            },
            "type": "text",
            "MID": "App_HP_RecentlyViewed_3_1_RecentlyViewedProducts",
            "title": "Omniture All"
          }
        }
      },
      {
        "tillDate": "2017-03-17 08:00:00",
        "elements": [],
        "title": "Omniture",
        "isTimerEnabled": false,
        "fromDate": "2016-09-27 04:00:00",
        "dataSource": {
          "api_meta": {
            "personalise_rank": 2,
            "group_by": "personalisation"
          },
          "elementCount": 30,
          "type": "clubbed_api",
          "url": "172.30.0.4:8000/personalisation/v1",
          "payload": {
            "query_params": [
              {
                "default": 0,
                "key": "v"
              },
              {
                "default": null,
                "key": "adobe_id"
              },
              {
                "default": null,
                "key": "widget"
              }
            ]
          }
        },
        "type": "text",
        "display": {
          "columns": "1",
          "row": "1"
        },
        "more": null
      },
      {
        "tillDate": "2017-09-26 20:19:00",
        "elements": [
          {
            "type": "image",
            "data": {
              "aspectRatio": {
                "width": 480,
                "height": 413
              },
              "altText": "Party Gown",
              "target": {
                "url": "http://www.craftsvilla.com/cvfeeds/party-gowns-craftsvilla#feedid=630&pageId=1&",
                "header": ""
              },
              "imgURL": "https://s3-ap-southeast-1.amazonaws.com/assets1.craftsvilla.com/AppLaunch/home_page_assets/6_collections/collections_1.png",
              "title": ""
            },
            "MID": "App_HP_Collections_4_1_PartyGowns"
          },
          {
            "type": "image",
            "data": {
              "aspectRatio": {
                "width": 480,
                "height": 413
              },
              "altText": "Embrodered Sarees",
              "target": {
                "url": "http://www.craftsvilla.com/cvfeeds/elegant-embroideries-sarees-craftsvilla#feedid=336&pageId=1&",
                "header": ""
              },
              "imgURL": "https://s3-ap-southeast-1.amazonaws.com/assets1.craftsvilla.com/AppLaunch/home_page_assets/6_collections/collections_2.png",
              "title": ""
            },
            "MID": "App_HP_Collections_4_2_EmbroideredSarees"
          },
          {
            "type": "image",
            "data": {
              "aspectRatio": {
                "width": 480,
                "height": 413
              },
              "altText": "Anarkali Suits",
              "target": {
                "url": "http://www.craftsvilla.com/cvfeeds/anarkali-offer-craftsvilla#feedid=901&pageId=1&",
                "header": ""
              },
              "imgURL": "https://s3-ap-southeast-1.amazonaws.com/assets1.craftsvilla.com/AppLaunch/home_page_assets/6_collections/collections_3.png",
              "title": ""
            },
            "MID": "App_HP_Collections_4_3_AnarkaliSuits"
          },
          {
            "type": "image",
            "data": {
              "aspectRatio": {
                "width": 480,
                "height": 413
              },
              "altText": "Temple Jewellery",
              "target": {
                "url": "http://www.craftsvilla.com/cvfeeds/temple-jewellery#feedid=874&pageId=1&",
                "header": ""
              },
              "imgURL": "https://s3-ap-southeast-1.amazonaws.com/assets1.craftsvilla.com/AppLaunch/home_page_assets/6_collections/collections_4.png",
              "title": ""
            },
            "MID": "App_HP_Collections_4_4_TempleJewellery"
          },
          {
            "type": "image",
            "data": {
              "aspectRatio": {
                "width": 480,
                "height": 413
              },
              "altText": "Jaipuri Bedsheets",
              "target": {
                "url": "http://www.craftsvilla.com/cvfeeds/buy-latest-jaipuri-bedsheets-online-craftsvilla#feedid=645&pageId=1&",
                "header": ""
              },
              "imgURL": "https://s3-ap-southeast-1.amazonaws.com/assets1.craftsvilla.com/AppLaunch/home_page_assets/6_collections/collections_5.png",
              "title": ""
            },
            "MID": "App_HP_Collections_4_5_JaipuriBedsheets"
          }
        ],
        "title": "Collections",
        "isTimerEnabled": false,
        "fromDate": "2016-09-04 20:19:00",
        "dataSource": {
          "url": "",
          "elementCount": null,
          "type": null
        },
        "type": "slider",
        "display": {
          "columns": "1.3",
          "row": "1"
        },
        "more": null
      },
      {
        "tillDate": "2017-09-26 20:28:00",
        "elements": [],
        "title": "Trending Sarees",
        "isTimerEnabled": false,
        "fromDate": "2016-09-04 20:28:00",
        "dataSource": {
          "url": "http://www.craftsvilla.com/cvfeeds/trending-sarees-craftsvilla/#feedid=345&pageId=1&",
          "elementCount": 20,
          "type": "panel"
        },
        "type": "slider",
        "display": {
          "columns": "3",
          "row": "1"
        },
        "more": {
          "type": "widget",
          "data": {
            "body": "",
            "target": {
              "url": "http://www.craftsvilla.com/cvfeeds/trending-sarees-craftsvilla#feedid=345&pageId=1&",
              "header": ""
            },
            "type": "text",
            "MID": "App_HP_TrendingSarees_5_1_TrendingSarees",
            "title": "View All"
          }
        }
      },
      {
        "tillDate": "2017-09-25 20:30:00",
        "elements": [
          {
            "type": "image",
            "data": {
              "aspectRatio": {
                "width": 480,
                "height": 520
              },
              "altText": "Latest From Our Blog",
              "target": {
                "url": "http://www.craftsvilla.com/blog/zodiac-wedding-style-guide-indian-bride/?utm_source=craftsvillaapp&render=internal",
                "header": ""
              },
              "imgURL": "http://assets1.craftsvilla.com/banner-craftsvilla/cvfeeds/1480600154_1_blog.jpg",
              "title": ""
            },
            "MID": "App_HP_Blog_6_1_Blog1"
          },
          {
            "type": "image",
            "data": {
              "aspectRatio": {
                "width": 480,
                "height": 520
              },
              "altText": "Latest From Our Blog",
              "target": {
                "url": "http://www.craftsvilla.com/blog/best-bollywood-celebrity-looks-from-ambani-bash/?utm_source=craftsvillaapp&render=internal",
                "header": ""
              },
              "imgURL": "http://assets1.craftsvilla.com/banner-craftsvilla/cvfeeds/1480600169_7CelebrityLooks_011216_blog_newapp.jpg",
              "title": ""
            },
            "MID": "App_HP_Blog_6_2_Blog2"
          },
          {
            "type": "image",
            "data": {
              "aspectRatio": {
                "width": 480,
                "height": 520
              },
              "altText": "Latest From Our Blog",
              "target": {
                "url": "http://www.craftsvilla.com/blog/ikat-textile-fashion-trend/?utm_source=craftsvillaapp&render=internal",
                "header": ""
              },
              "imgURL": "http://assets1.craftsvilla.com/banner-craftsvilla/cvfeeds/1480600194_Ikat_011216_blog_newapp.jpg",
              "title": ""
            },
            "MID": "App_HP_Blog_6_3_Blog3"
          },
          {
            "type": "image",
            "data": {
              "aspectRatio": {
                "width": 480,
                "height": 520
              },
              "altText": "Latest From Our Blog",
              "target": {
                "url": "http://www.craftsvilla.com/blog/stylish-saree-blouse-designs-to-wear-everyday/?utm_source=craftsvillaapp&render=internal",
                "header": ""
              },
              "imgURL": "http://assets1.craftsvilla.com/banner-craftsvilla/cvfeeds/1480600214_BlouseInspiration_011216_blog_newapp.jpg",
              "title": ""
            },
            "MID": "App_HP_Blog_6_4_Blog4"
          }
        ],
        "title": "Latest From Our Blog",
        "isTimerEnabled": false,
        "fromDate": "2016-09-04 04:00:00",
        "dataSource": {
          "url": "",
          "elementCount": null,
          "type": null
        },
        "type": "slider",
        "display": {
          "columns": "1.3",
          "row": "1"
        },
        "more": null
      },
      {
        "tillDate": "2017-09-26 23:00:00",
        "elements": [],
        "title": "Trending Salwar Suits",
        "isTimerEnabled": false,
        "fromDate": "2016-09-25 23:00:00",
        "dataSource": {
          "url": "http://www.craftsvilla.com/cvfeeds/trending-salwarsuits-craftsvilla?MID=Normal__8_349_7#feedid=349&pageId=1&",
          "elementCount": null,
          "type": "panel"
        },
        "type": "slider",
        "display": {
          "columns": "3",
          "row": "1"
        },
        "more": {
          "type": "widget",
          "data": {
            "body": "",
            "target": {
              "url": "http://www.craftsvilla.com/cvfeeds/trending-salwarsuits-craftsvilla?MID=Normal__8_349_7#feedid=349&pageId=1&",
              "header": ""
            },
            "type": "text",
            "MID": "App_HP_TrendingSalwarSuits_7_1_TrendingSalwarSuits",
            "title": "View All"
          }
        }
      },
      {
        "tillDate": "2017-03-17 08:00:00",
        "elements": [
          {
            "type": "image",
            "data": {
              "altText": "",
              "target": {
                "url": "http://www.craftsvilla.com/cvfeeds/georgette-sarees-offer-craftsvilla#feedid=900&pageId=1&",
                "header": ""
              },
              "title": "",
              "grid": {
                "origin": {
                  "y": 0,
                  "x": 0
                },
                "length": {
                  "y": 3,
                  "x": 2
                }
              },
              "aspectRatio": {
                "width": 375,
                "height": 135
              },
              "imgURL": "https://s-media-cache-ak0.pinimg.com/originals/d8/73/62/d87362d13aee46cab707013b05fbc1e9.jpg"
            },
            "MID": "HP_Platinum_Banner1"
          },
          {
            "type": "image",
            "data": {
              "altText": "",
              "target": {
                "url": "http://www.craftsvilla.com/cvfeeds/designer-salwar-suit-craftsvilla#feedid=652&pageId=1&",
                "header": ""
              },
              "title": "",
              "grid": {
                "origin": {
                  "y": 0,
                  "x": 2
                },
                "length": {
                  "y": 1,
                  "x": 1
                }
              },
              "aspectRatio": {
                "width": 375,
                "height": 135
              },
              "imgURL": "http://cdn.moneycrashers.com/wp-content/uploads/2015/09/clown-birthday-party.jpg"
            },
            "MID": "HP_Platinum_Banner2"
          },
          {
            "type": "image",
            "data": {
              "altText": "",
              "target": {
                "url": "http://www.craftsvilla.com/cvfeeds/designer-salwar-suit-craftsvilla#feedid=652&pageId=1&",
                "header": ""
              },
              "title": "",
              "grid": {
                "origin": {
                  "y": 1,
                  "x": 2
                },
                "length": {
                  "y": 1,
                  "x": 1
                }
              },
              "aspectRatio": {
                "width": 375,
                "height": 135
              },
              "imgURL": "http://sd.keepcalm-o-matic.co.uk/i/happy-birthday-mumma.png"
            },
            "MID": "HP_Platinum_Banner2"
          },
          {
            "type": "image",
            "data": {
              "altText": "",
              "target": {
                "url": "http://www.craftsvilla.com/cvfeeds/designer-salwar-suit-craftsvilla#feedid=652&pageId=1&",
                "header": ""
              },
              "title": "",
              "grid": {
                "origin": {
                  "y": 2,
                  "x": 2
                },
                "length": {
                  "y": 1,
                  "x": 1
                }
              },
              "aspectRatio": {
                "width": 375,
                "height": 135
              },
              "imgURL": "http://cdn.moneycrashers.com/wp-content/uploads/2015/09/clown-birthday-party.jpg"
            },
            "MID": "HP_Platinum_Banner2"
          }
        ],
        "title": "Happy Birthday Mumma!!!",
        "isTimerEnabled": false,
        "fromDate": "2016-09-27 04:00:00",
        "dataSource": {
          "url": "",
          "elementCount": null,
          "type": null,
          "api_type": null
        },
        "grid": {
          "origin": {
            "y": 0,
            "x": 0
          },
          "length": {
            "y": 3,
            "x": 3
          }
        },
        "type": "grid",
        "display": {
          "columns": "1",
          "row": "1"
        },
        "more": null
      },
      {
        "tillDate": "2017-03-17 08:00:00",
        "elements": [
          {
            "type": "text",
            "data": {
              "aspectRatio": {
                "width": 375,
                "height": 135
              },
              "altText": "",
              "target": {
                "url": "http://www.craftsvilla.com/cvfeeds/georgette-sarees-offer-craftsvilla#feedid=900&pageId=1&",
                "header": ""
              },
              "imgURL": "hhttps://scontent-sin6-1.xx.fbcdn.net/v/t1.0-9/10599671_10154874131195459_5291305761308734266_n.jpg?oh=ec1f946ac52a76c6dde79df7cc851973&oe=58ED416C",
              "title": "text value"
            },
            "MID": "HP_Platinum_Banner1",
            "format": "oval"
          }
        ],
        "title": "Happy Birthday Mumma!!!",
        "isTimerEnabled": false,
        "fromDate": "2016-09-27 04:00:00",
        "dataSource": {
          "url": "",
          "elementCount": null,
          "type": null,
          "api_type": null
        },
        "type": "slider",
        "display": {
          "columns": "1",
          "row": "1"
        },
        "more": null
      }
    ],
    "pageType": "homepage",
    "meta": "ADD User",
    "name": "home",
    "userType": "every"
  }
}
    res.send(data);
});
module.exports = router;
