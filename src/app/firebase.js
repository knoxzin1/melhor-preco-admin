import { initializeApp } from 'firebase'
import config from '../../config';

const firebase = initializeApp(config);

export function getLocations() {
  const locationsRef = firebase.database().ref('locations');

  return locationsRef.once('value').then((snapshot) => {
    return snapshot.val();
  });
}

export function getLocationProduct(productId, location) {
  const ref = firebase.database().ref('locationProduct');

  return ref
    .orderByChild('product')
    .equalTo(productId)
    .once('value')
    .then((snapshot) => {
      let locationProduct = null;
      let locationProductId = null;

      if (!snapshot.val()) {
        return null;
      }

      snapshot.forEach((childSnapshot) => {
        if (childSnapshot.val().location === location) {
          locationProductId = childSnapshot.getKey();
          locationProduct = childSnapshot.val();
          return true;
        }
      });

      return {
        locationProduct: locationProduct
          ? {[locationProductId]: locationProduct}
          : null,
        locationProductId,
      };
    });
}

export function getProductByBarcode(barcode, location) {
  const productsRef = firebase.database().ref('products');

  return productsRef
    .orderByChild('barcode')
    .equalTo(barcode)
    .limitToFirst(1)
    .once('value')
    .then((snapshot) => {
      const product = snapshot.val();

      if (!product) {
        return null;
      } else {
        const productId = Object.keys(product)[0];

        return getLocationProduct(productId, location)
          .then(({locationProduct, locationProductId}) => {
            return {
              productId,
              product,
              locationProduct,
              locationProductId,
            };
          });
      }
    });
}

const insertOrUpdateProduct = (product) => {

  const {
    productId,
    locationProductId,
    name,
    price,
    barcode,
    location,
  } = product;

  var updates = {};
  updates[`/products/${productId}`] = {
    name,
    barcode,
  };
  updates[`/locationProduct/${locationProductId}`] = {
    location,
    price,
    product: productId,
  };

  return firebase.database().ref().update(updates);
};

export function insertProduct(product) {

  const { productId, locationProductId } = product;

  if (productId) {
    // update product
    if (locationProductId) {
      // product already exist in this location
      return insertOrUpdateProduct(product);
    } else {
      // product don't exist in this location
      var newlocationProductKey = firebase.database().ref().child('locationProduct').push().key;

      return insertOrUpdateProduct({
        ...product,
        locationProductId: newlocationProductKey,
      });
    }
  } else {
    // insert product
    var newProductKey = firebase.database().ref().child('products').push().key;
    var newLocationProductKey = firebase.database().ref().child('locationProduct').push().key;

    return insertOrUpdateProduct({
      ...product,
      productId: newProductKey,
      locationProductId: newLocationProductKey,
    });
  }
}

export function insertProducts(products) {
  return products.reduce(function(promise, product) {
    return promise.then(function() {
      return insertProduct(product);
    });
  }, Promise.resolve());
}
