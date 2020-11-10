var anchorList = document.querySelectorAll('.anchor-link');
var anchor;

for (i = 0; i < anchorList.length; i++) {
  anchor = anchorList[i];
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    var link = e.target.nodeName === 'SPAN' ? e.target.parentNode : e.target;
    var blockID = link.getAttribute('href').substr(1);
    window.scrollTo({
      top: document.getElementById(blockID).offsetTop,
      left: 0,
      behavior: 'smooth'
    });
  });
}
