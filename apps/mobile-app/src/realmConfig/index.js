// import Realm from 'realm';

// const AppSchema = {
//   name: 'App',
//   properties: {
//     locale: 'string',
//   },
// };

// const AuthSchema = {
//   name: 'Auth',
//   // primaryKey: 'id',
//   properties: {
//     id: 'string',
//     token: 'string',
//     email: 'string',
//     scope: 'string',
//     emailVerified: 'bool',
//     ttl: 'int',
//   },
// };

// export class BaseSchema {
//   schema = {primaryKey: 'id', properties: {}};

//   constructor(name, initialData) {
//     this.schema.name = name;
//     Object.keys(initialData).forEach(key => {
//       this.schema.properties[key] = 'string';
//     });
//   }

//   getSchema() {
//     return this.schema;
//   }
// }

// export const realm = Realm.open({schema: [AppSchema, AuthSchema]});

// export const writeToRealm = (model, data) => {
//   realm.write(() => {
//     const record = realm.create(model, data);
//     // And then he didn't do so well on the third test
//     return record;
//   });
// };

// export const getAllData = (model, page, pageSize) => {
//   const instance = realm.objects(model);
//   return instance.slice(pageSize * (page - 1), pageSize * page);
// };

// export const getDataById = (model, id) => {
//   const instance = realm.objects(model);
//   const record = instance.filtered(`id = "${id}"`);
//   return record;
// };

// export const update = (model, id, data) => {
//   const instance = realm.objects(model);
//   const record = instance.filtered(`id = "${id}"`);
//   Object.keys(data).forEach(key => {
//     record[key] = data[key];
//   });

//   return record;
// };
