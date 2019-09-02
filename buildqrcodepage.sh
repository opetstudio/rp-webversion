#!/bin/bash

PROJECT_JSP="prismalink-paymentpagecc"
npm run build
cp -rf build/manifest.json ~/workspace_java/$PROJECT_JSP/src/main/resources/
cp -rf build/static/* ~/workspace_java/$PROJECT_JSP/src/main/resources/static/static/
# sed 's/_FIRST_NAME_/${_FIRST_NAME_}/g; s/_LAST_NAME_/${_LAST_NAME_}/g' 'build/index.html' > 'build/index.html'
sed 's/_FIRST_NAME_/${_FIRST_NAME_}/g;s/_LAST_NAME_/${_LAST_NAME_}/g;s/_CALLBACK_URL_/${_CALLBACK_URL_}/g;s/_CTRX_ID_/${_CTRX_ID_}/g;s/_STRX_ID_/${_STRX_ID_}/g;s/_PAR1_/${_PAR1_}/g;s/_PAR2_/${_PAR2_}/g;s/_PAR3_/${_PAR3_}/g;s/_PAR4_/${_PAR4_}/g;s/_PAR5_/${_PAR5_}/g;s/_PAR6_/${_PAR6_}/g;s/_PAR7_/${_PAR7_}/g;s/_PAR8_/${_PAR8_}/g;s/_PAR9_/${_PAR9_}/g;s/_PAR10_/${_PAR10_}/g;s/_PAR11_/${_PAR11_}/g;s/_PAR12_/${_PAR12_}/g;s/_MERCHANT_NAME_/${_MERCHANT_NAME_}/g;s/_PRODUCT_CODE_/${_PRODUCT_CODE_}/g;s/_LANG_/${_LANG_}/g;s/_PERIOD_/${_PERIOD_}/g' build/index.html > build/index_replaced.html 
cp -rf build/index_replaced.html ~/workspace_java/$PROJECT_JSP/src/main/resources/templates/home.html
