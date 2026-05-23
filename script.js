
const reveals = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver((entries)=>{
entries.forEach((entry)=>{
if(entry.isIntersecting){
entry.target.classList.add('active');
}
});
},{
threshold:0.15
});

reveals.forEach((el)=> observer.observe(el));


const themeToggle = document.getElementById('theme-toggle');

themeToggle.addEventListener('click', ()=>{
document.body.classList.toggle('light-mode');

if(document.body.classList.contains('light-mode')){
themeToggle.innerHTML = '🌙';
}else{
themeToggle.innerHTML = '☀️';
}
});
