var db = firebase.database();

function addWides(m){
  db.ref('current').once('value').then(function(snap){
    var cIn = snap.val();
    db.ref('extras/'+ cIn + '/wides').once('value').then(function(s){
      var w = s.val();
      w += m;
      db.ref('extras/'+ cIn + '/wides').set(w);
    })
  })
}

function addNoballs(m){
  db.ref('current').once('value').then(function(snap){
    var cIn = snap.val();
    db.ref('extras/'+ cIn + '/noballs').once('value').then(function(s){
      var n = s.val();
      n += m;
      db.ref('extras/'+ cIn + '/noballs').set(n);
    })
  })
}

function addBuys(m){
  db.ref('current').once('value').then(function(snap){
    var cIn = snap.val();
    db.ref('extras/'+ cIn + '/buys').once('value').then(function(s){
      var n = s.val();
      n += m;
      db.ref('extras/'+ cIn + '/buys').set(n);
    })
  })
}

function addLegBuys(m){
  db.ref('current').once('value').then(function(snap){
    var cIn = snap.val();
    db.ref('extras/'+ cIn + '/legbuys').once('value').then(function(s){
      var n = s.val();
      n += m;
      db.ref('extras/'+ cIn + '/legbuys').set(n);
    })
  })
}


function setCompleted(i){
  db.ref('general/completed/'+ i).once('value').then(function(snap){
    let stat = snap.val();
    if(stat){
      db.ref('general/completed/'+ i).set(false);
    }else{
      db.ref('general/completed/'+ i).set(true);
    }
  })
}


function setLead(i, s){
  db.ref('general/school/'+i).set(s);
}

var rad = document.getElementsByName('in');
for(var i = 0; i < rad.length; i++) {
    rad[i].addEventListener('change', function() {
        db.ref('current').set(this.value);
    });
}