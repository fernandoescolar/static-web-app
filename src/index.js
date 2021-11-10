import './styles/main.scss';

/* navbar opacity management */
window.addEventListener('scroll', function(e) {
  if (window.scrollY > 100) {
    document.getElementsByTagName("nav")[0].classList.add("solid");
  } else {
    document.getElementsByTagName("nav")[0].classList.remove("solid");
  }
});

/* hamburger status management: opened or closed */
document.getElementById('hamburger').addEventListener('click', function () {
  const classList = document.getElementsByTagName("nav")[0].classList;
  if (classList.contains('active')) {
    classList.remove('active');
  } else {
    classList.add('active');
  }
});