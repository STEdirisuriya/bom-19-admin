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
        if (arr[i].school == curSchool) {
          var c = arr[i].name;
          playerArr += "<option value='" + c + "'>";
        }
      }
      playerArr += "</datalist>";
      dis.innerHTML = playerArr;
    });
  });
});

var player_1;
var player_2;

var player1 = {
  addRuns: function(r) {
    db.ref("current").on("value", snap => {
      var cIn = snap.val();
      db.ref(cIn + "/batting/" + player_1 + "/runs")
        .once("value")
        .then(function(sn) {
          var n = sn.val();
          n += r;
          db.ref(cIn + "/batting/" + player_1 + "/runs").set(n);
        });
      db.ref(cIn + "/runs")
        .once("value")
        .then(function(s) {
          var k = s.val();
          k += r;
          db.ref(cIn + "/runs").set(k);
        });
    });
  },
  addBalls: function(r) {
    db.ref("current").on("value", snap => {
      var cIn = snap.val();
      db.ref(cIn + "/batting/" + player_1 + "/balls")
        .once("value")
        .then(function(sn) {
          var n = sn.val();
          n += r;
          db.ref(cIn + "/batting/" + player_1 + "/balls").set(n);
        });
    });
  },
  setOut: function() {
    db.ref("current").on("value", snap => {
      var cIn = snap.val();
      db.ref(cIn + "/batting/" + player_1 + "/out").set(true);
    });
  },
  setNotOut: function() {
    db.ref("current").on("value", snap => {
      var cIn = snap.val();
      db.ref(cIn + "/batting/" + player_1 + "/out").set(false);
    });
  },
  clean: function() {
    player_1 = "";
  },
  inField: function() {
    db.ref("current").on("value", snap => {
      var cIn = snap.val();
      db.ref(cIn + "/batting/" + player_1 + "/field").set(true);
    });
  },
  notInField: function() {
    db.ref("current").on("value", snap => {
      var cIn = snap.val();
      db.ref(cIn + "/batting/" + player_1 + "/field").set(false);
    });

  }
};

var player2 = {
  addRuns: function(r) {
    db.ref("current").on("value", snap => {
      var cIn = snap.val();
      db.ref(cIn + "/batting" + player_2 + "/runs")
        .once("value")
        .then(function(sn) {
          var n = sn.val();
          n += r;
          db.ref(cIn + "/batting/" + player_2 + "/runs").set(n);
        });
        db.ref(cIn + "/runs")
        .once("value")
        .then(function(s) {
          var k = s.val();
          k += r;
          db.ref(cIn + "/runs").set(k);
        });
    });
  },
  addBalls: function(r) {
    db.ref("current").on("value", snap => {
      var cIn = snap.val();
      db.ref(cIn + "/batting/" + player_2 + "/balls")
        .once("value")
        .then(function(sn) {
          var n = sn.val();
          n += r;
          db.ref(cIn + "/batting/" + player_2 + "/balls").set(n);
        });
    });
  },
  setOut: function() {
    db.ref("current").on("value", snap => {
      var cIn = snap.val();
      db.ref(cIn + "/batting/" + player_2 + "/out").set(true);
    });
  },
  setNotOut: function() {
    db.ref("current").on("value", snap => {
      var cIn = snap.val();
      db.ref(cIn + "/batting/" + player_2 + "/out").set(false);
    });
  },
  clean: function() {
    player_2 = "";
  },
  inField: function() {
    db.ref("current").on("value", snap => {
      var cIn = snap.val();
      db.ref(cIn + "/batting/" + player_2 + "/field").set(true);
    });
  },
  notInField: function() {
    db.ref("current").on("value", snap => {
      var cIn = snap.val();
      db.ref(cIn + "/batting/" + player_2 + "/field").set(false);
    });
  }
};

function setPlayer(a) {
  if (a == 1) {
    var name1 = document.getElementById("p1name").value;
    db.ref("current").on("value", snap => {
      var cIn = snap.val();
      db.ref(cIn + "/batting/" + name1 + "/name").set(name1);
    });
    player_1 = name1;
  } else if (a == 2) {
    var name2 = document.getElementById("p2name").value;
    db.ref("current").on("value", snap => {
      var cIn = snap.val();
      db.ref(cIn + "/batting/" + name2 + "/name").set(name2);
    });
    player_2 = name2;
  }
}
