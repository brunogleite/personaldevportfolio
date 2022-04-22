


var tl = gsap.timeline()

tl.to(".heading-box > span", {opacity: 1, translateY: 0, ease:"power2.out"})
//tl.to(".nav-bar", {opacity: 1, duration:0.5, ease:"power2.out", scaleX : 1 })
//tl.to(".nav-links", {opacity: 1, duration: 1.5, ease:"power2.out"}, 1)

//ON PAGE LOAD
$(".content-wrapper").addClass("first");
let nextPageLink;


//ON CLICK
$(".nav-links-p").on("click", function (e){
    e.preventDefault();
    nextPageLink = $(this).attr("href");
    console.log(nextPageLink)

    //AJAX
    $.ajax({
        url: nextPageLink,
        success: function(response){
            let element = $(response).find(".content-wrapper").addClass("second");
            $(".main-wrapper").append(element)
        },
        complete: function(){
            pageTransition();
        }
    })
})

function pageTransition(){
    $("html").addClass("animating")

    let tl = gsap.timeline({
        onComplete: updatePage()
    });
    tl.from(".content-wrapper.second", {
        y:"110vh",
        delay:0.2,
        duration: 0.8,
        ease:"power2.out"
    })
    tl.to(".overlay", {
        opacity: 0.7,
        duration: 0.3,
        ease:"power1.out"
    }, 0)
    tl.to(".content-wrapper.first", {
        scale: 0.95,
        duration: 0.3,
        ease: "power1.out"
    }, 0)
}

function updatePage(){
    window.location = nextPageLink;
}