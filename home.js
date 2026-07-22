function changeGenre(s) {
    switch(s.value) {
        case "games":
            const notGameEles = document.querySelectorAll(".opus-details:not(.game)");
            notGameEles.forEach((n) => {
                n.style.display = "none";
            });
            const gameEles = document.querySelectorAll(".game");
            gameEles.forEach((g) => {
                g.style.display = null;
            });
            break;
        case "tools":
            const notToolEles = document.querySelectorAll(".opus-details:not(.tool)");
            notToolEles.forEach((n) => {
                n.style.display = "none";
            });
            const toolEles = document.querySelectorAll(".tool");
            toolEles.forEach((t) => {
                t.style.display = null;
            });
            break;
        case "other":
            const notOtherEles = document.querySelectorAll(".opus-details:not(.other)");
            notOtherEles.forEach((n) => {
                n.style.display = "none";
            });
            const otherEles = document.querySelectorAll(".other");
            otherEles.forEach((o) => {
                o.style.display = null;
            });
            break;
        default:
            const opusDetailsEles = document.querySelectorAll(".opus-details");
            opusDetailsEles.forEach((o) => {
                o.style.display = null;
            });
    }
}

window.onload = function() {
    const genreSelectEle = document.getElementById("genre-select");
    genreSelectEle.addEventListener("change", () => {
        changeGenre(genreSelectEle);
    });
}