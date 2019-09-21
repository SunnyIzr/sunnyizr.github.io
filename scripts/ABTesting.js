var ABTesting = {
  init: function(){
    // this.newExperiment("emotional_spender_results", 'short', 'long');
  },
  currentExperiments: {},
  newExperiment: function(name, variant1_name, variant2_name){
    var args = {
      name: name,
      variants: {}
    };

    var variant1 = {
      activate: function(){
        $('*[data-variant="' + variant1_name + '"]').addClass("variant-visible");
      },
      weight: 50
    }

    var variant2 = {
      activate: function(){
        $('*[data-variant="' + variant2_name + '"]').addClass("variant-visible");
      },
      weight: 50
    }
    args.variants[variant1_name] = variant1
    args.variants[variant2_name] = variant2
    
    new AlephBet.Experiment(args);
    ABTesting.setCurrentExperiment(name)
  },
  getTestingStore: function(){
    var store = localStorage.getItem('alephbet');
    if (store) {
      return JSON.parse(store);
    } else {
      return null;
    }
  },
  setCurrentExperiment: function(experimentName){
    var store = ABTesting.getTestingStore()
    var storeKeys = Object.keys(store)

    for (var i=0; i < storeKeys.length; i++){
      var storeKey = storeKeys[i]
      if (storeKey.indexOf('variant') >= 0){
        var experimentVariant = store[storeKey]
      }
    }
    ABTesting.currentExperiments[experimentName] = experimentVariant
  },
  mixPanelTrack: function(event, data, experimentName){
    var experimentVariant = ABTesting.currentExperiments[experimentName]
    data['experiment:' + experimentName] = experimentVariant

    mixpanel.track(event, data);
  }
}