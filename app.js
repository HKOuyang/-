(function(){
  var pool=[], idx=-1, order=[];
  function shuffle(a){ for(var i=a.length-1;i>0;i--){ var j=Math.floor(Math.random()*(i+1)); var t=a[i]; a[i]=a[j]; a[j]=t; } return a; }
  function buildPool(){
    var onlyKata = document.getElementById('onlyKata').checked;
    pool = DATA.filter(function(x){ return onlyKata ? (!x.kanji || x.kanji==='') : true; });
    order = []; for(var i=0;i<pool.length;i++) order.push(i); shuffle(order);
  }
  function setBtns(flag){ ['showKanji','showRomaji','showBorrow','next'].forEach(function(id){ document.getElementById(id).disabled=!flag; }); }
  function pickNext(){
    if(order.length===0){ buildPool(); }
    idx = order.pop();
    var item = pool[idx];
    document.getElementById('kana').textContent = item.kana || '（？）';
    document.getElementById('kanji').textContent = item.kanji ? '（未顯示）' : '（漢字なし）';
    document.getElementById('romaji').textContent = '（未顯示）';
    document.getElementById('borrow').textContent = '（未顯示）';
    document.getElementById('cn').textContent = '（未顯示）';
    document.getElementById('counter').textContent = '剩餘：' + order.length + '　題庫：' + pool.length;
    setBtns(true);
  }
  window.addEventListener('load', function(){
    document.getElementById('start').onclick = function(){ buildPool(); pickNext(); };
    document.getElementById('onlyKata').onchange = function(){ buildPool(); pickNext(); };
    document.getElementById('showKanji').onclick = function(){ var item = pool[idx]; document.getElementById('kanji').textContent = item.kanji || '（漢字なし）'; document.getElementById('cn').textContent = item.cn || ''; };
    document.getElementById('showRomaji').onclick = function(){ var item = pool[idx]; document.getElementById('romaji').textContent = item.romaji || ''; };
    document.getElementById('showBorrow').onclick = function(){ var item = pool[idx]; document.getElementById('borrow').textContent = item.borrow || '（借用資訊なし）'; };
    document.getElementById('next').onclick = pickNext;
    if('serviceWorker' in navigator){ navigator.serviceWorker.register('service-worker.js'); }
  });
})();