##ember-data

- application <-> store <-> adapater <-> adapter <-> persisetnece alyer (via serializer)
- routes access to store and injected.
- store is ember service acting as a data acces layercahce 
- saves them to persistence layer
- canalso turn them into data rich client sdie models
- store also implements idendtiy map to prefvent duplicate retreival of objects from persistence layer
- identity mapping is a pattern used for store to perserve object idtentiy, and return same object instances
- store delegates the specifis of how to work with a perseictnce layer to an adapter
- by isolating specifics of where date comes from in adapter, change communication
- serializer used to format data sent to server (serialization), second serilair used to format data received from server (normalization)
- each ds.attr mapes to ds.transform, if don't pass anything to ds.attr, value is passed through as it is
- model relationships are asynchrouns, when accessed if not in store, ember data will trifeger a fetch and return a promise that resolves with related model. can be decalred synchronously
- to declare it synch, set async to false
-jsonapi datersets acept header to applicatin/vnd.api_json instead of application/json by restadapter. . jsonapiadatper overrides the pathforType adater method so resocure pathes are dasherized as opposed to cample case, json api does patch instead of put
- coalsefindRequests with Ds.rest aapdter it grabs a nimcj pf attrobites
- background reloading means the record in the store is intially returned to the called but a reuwst is made in the background to check for new data. thus new records are never stale
- can override shu=ouldBacg=grkiundReloadAll methods
- jsonserializer does not have name, but rest serialier does and the relationships as attrs          
- destserlizer supports dara sideloading allowed for embed related records in the json resposnse
- generally use jsonapiserializer
- related rsouces can be sideloaded with the included key for jsonapi serlizer
-  once icluded, can be made to be ynchronos
- say want to overridepathfor type
```
adapter({
  pathForType(modelName) {
    return modelName
  }
})
```
- 
can create customer adpater:

import ApplicationAdere form './aplication';
export Default Adapter.extend({
  urlForQuery(query, modelName) {
    let city = Ember.String.dasherize(query.city.toLowerCase())
    delete query.city
    return `${this.host}/${this.namespace}/contacts/${city}`
  }
})

-not camelcased payloads: can map via serializers. example:

export default Ds.JSONSerializer.extend({
  attrs: {
  firstName: 'first_name'
  }
})

- created custom keyForRelationship in serializer:
keyForRelationship(key, relatonship) {
  if (relationshp === 'belongsTo') {
  return `${key}_id`
  }
}

, can override primary key serializer if not id

- normalizeResponse method used to nromalize a payload from server to json api document
- can to it for specific methods, ie: normalizeFindAllResponse()
- Inside the normalize() method, we’ve taken each contact and normalized it into the JSON-API format. For a single resource endpoint like /api/contacts/:id, the normalize() method will get called once. For an endpoint that returns a collection of resources such as /api/contacts, normalize() will get called for each resource object.
- 

clean ember data serialiser:
export default DS.Serializer.extend({ //...
normalizeResponse(store, primaryModelClass, payload, id, requestType) { switch (requestType) {
case 'findRecord':
return this.normalizeFindRecordResponse(...arguments);
case 'queryRecord':
return this.normalizeQueryRecordResponse(...arguments);
case 'findAll':
return this.normalizeFindAllResponse(...arguments);
case 'findBelongsTo':
return this.normalizeFindBelongsToResponse(...arguments);
case 'findHasMany':
return this.normalizeFindHasManyResponse(...arguments);
case 'findMany':
return this.normalizeFindManyResponse(...arguments);
case 'query':
return this.normalizeQueryResponse(...arguments);
case 'createRecord':
return this.normalizeCreateRecordResponse(...arguments);
case 'deleteRecord':
return this.normalizeDeleteRecordResponse(...arguments);
case 'updateRecord':
return this.normalizeUpdateRecordResponse(...arguments);
} }
})


- can ovlerload serliaizer for ember to grab nested relationships as well:
export default DS.RESTSerializer.extend({
normalizeResponse(store, primaryModelClass, payload, id, requestType) {
let resource = payload.contact; resource.links = {
pets: `/api/contacts/${resource.id}/pets`,
company: `/api/contacts/${resource.id}/company` };
return this._super(...arguments);
} });

-> user Array noramlize:

export default ApplicationSerializer.extend({
normalizeSingleResponse(store, primaryModelClass, payload, id, requestType) {
this.createLinks(payload.contact);
return this._super(...arguments); },
normalizeArrayResponse(store, primaryModelClass, payload, id, requestType) { payload.contacts.forEach(this.createLinks);
return this._super(...arguments);
  },
  createLinks(contact) {
contact.links = {
pets: `/api/contacts/${contact.id}/pets`, company: `/api/contacts/${contact.id}/company`
}; }
});

- when nothing is passed to ds.attr(), no trnasomr and ember data just passes that through
- just use model.set('address.street', '1234') tp change value
- if array just use:
let googleItem = model.get('history')[0];
2 Ember.set(googleItem, 'url', 'http://amazon.com');
- can handle responses with adapter

-keyForAttribute used to conert model attributes to payload keys

// app/serializers/application.js
import DS from 'ember-data';
export default DS.JSONAPISerializer.extend({ keyForAttribute(attr, method) {
return Ember.String.underscore(attr);