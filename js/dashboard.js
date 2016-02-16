(function () {
  var container = document.getElementById('container-row');
  var keys = {
    assistido: 'Assistido',
    animes: 'Animes',
    nome: 'Nome',
    data: 'Data',
    episodio: 'Episódio',
    duracao: 'Duração'
  };
  
  Tabletop.init({
    key: '1j_6G6_4EoPzSFvmJ4dbPGqRJfivsdKcPEESLeNKnCEg',
    callback: onLoaded
  });
  
  function onLoaded (sheets) {
    document.getElementById('loading-message').style.display = 'none';
    
    var assistido = sheets[keys.assistido].elements;
    var names = assistido.map(function (e) {
      return e[keys.nome];
    });

    var uniqueNames = names.filter(function (e, i) {
      return i === names.indexOf(e);
    });
    
    var animes = sheets[keys.animes].elements.reduce(function (acc, element) {
      acc[element[keys.nome]] = element;
      return acc;
    }, {});
    
    var days = assistido.reduce(function (acc, element) {
      return acc += animes[element[keys.nome]][keys.duracao] | 0;
    }, 0) / 60 / 24;
    
    var stats = [{
      title: 'Watched animes',
      label: 'anime',
      value: uniqueNames.length,
      max: Math.floor(uniqueNames.length / 100 + 1) * 100
    }, {
      title: 'Watched episodes',
      label: 'episodes',
      value: assistido.length,
      max: Math.floor(assistido.length / 1000 + 1) * 1000
    }, {
      title: 'Watched days',
      label: 'days',
      value: days,
      max: Math.floor(days / 30 + 1) * 30
    }];
    
    stats.forEach(renderStat);
  }
    
  function renderStat(stat) {
    element = document.createElement('div');
    element.className = 'col-sm-' + (stat.size || 4);
    element.innerHTML = '<div class="chart-wrapper"><div class="chart-title">' + stat.title + '</div><div class="chart-stage">' +
    '<div class="chart-holder"></div></div></div>';
    container.appendChild(element);
    
    var gauge = new JustGage({
      parentNode: element.querySelector('.chart-holder'),
      label: stat.label,
      value: stat.value,
      max: stat.max
    });
  }
}());