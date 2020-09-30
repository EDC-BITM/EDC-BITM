function nav(){
    const nav=document.querySelector(".links");
    if(nav.style.right=="-100vw" || nav.style.right=="")
    {
        nav.style.right="0vw";
        document.getElementById('coverAll').style.display = 'block';
    }
    else
    {
        document.getElementById('coverAll').style.display = 'none';
        nav.style.right="-100vw";
    }

}