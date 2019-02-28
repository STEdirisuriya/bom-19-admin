let db = firebase.database();
db.ref("current").on("value", snap => {
  var current = snap.val();
  db.ref("general/school/" + current).on("value", sn => {
    var curSchool = sn.val();

    var dis = document.getElementById("dis");
    var playerArr = "";

    db.ref("players").on("value", snap => {
      playerArr += "<datalist id='names'>";
      var arr = snap.val();
      for (let i in arr) {
        if (arr[i].school != curSchool) {
          var c = arr[i].name;
          playerArr += "<option value='" + c + "'>";
        }
      }
      playerArr += "</datalist>";
      dis.innerHTML = playerArr;
    });
  });
});

var play;

function setPlayer() {
  var name = document.getElementById("pname").value;
  db.ref("current").on("value", snap => {
      var cIn = snap.val();
      db.ref(cIn + "/bowling/" + name + "/name").set(name);
    });
  play = name;
}

var player = {
  addRuns: function(r) {
    db.ref("current").on("value", snap => {
      var cIn = snap.val();
      db.ref(cIn + "/bowling/" + play + "/runs")
        .once("value")
        .then(function(sn) {
          var n = sn.val();
          n += r;
          db.ref(cIn + "/bowling/" + play + "/runs").set(n);
        });
    });
  },
  addBalls: function(r) {
    db.ref("current").on("value", snap => {
      var cIn = snap.val();
      db.ref(cIn + "/bowling/" + play + "/balls")
        .once("value")
        .then(function(sn) {
          var n = sn.val();
          n += r;
          db.ref(cIn + "/bowling/" + play + "/balls").set(n);
        });
      db.ref(cIn + "/balls")
        .once("value")
        .then(function(s) {
          var k = s.val();
          k += r;
          db.ref(cIn + "/balls").set(k);
        });
    });
  },
  addMaiden: function(r) {
    db.ref("current").on("value", snap => {
      var cIn = snap.val();
      db.ref(cIn + "/bowling/" + play + "/maiden")
        .once("value")
        .then(function(sn) {
          var n = sn.val();
          n += r;
          db.ref(cIn + "/bowling/" + play + "/maiden").set(n);
        });
    });
  },
  addWickets: function(r) {
    db.ref("current").on("value", snap => {
      var cIn = snap.val();
      db.ref(cIn + "/bowling/" + play + "/wickets")
        .once("value")
        .then(function(sn) {
          var n = sn.val();
          n += r;
          db.ref(cIn + "/bowling/" + play + "/wickets").set(n);
        });
    });
  },
  inField: function() {
    db.ref("current").on("value", snap => {
      var cIn = snap.val();
      db.ref(cIn + "/bowling/" + play + "/inField").set(true);
    });
  },
  notInField: function() {
    db.ref("current").on("value", snap => {
      var cIn = snap.val();
      db.ref(cIn + "/bowling/" + play + "/inField").set(false);
    });
  },
  clean: function() {
    play = "";
  }
};
