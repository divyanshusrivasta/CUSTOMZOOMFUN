document.addEventListener("DOMContentLoaded", function () {
    const mainImageContainer = document.querySelector(".main-image-container");
    const mainImage = document.querySelector("#mainImage");
    const zoomLens = document.createElement("div");
    const zoomBox = document.querySelector(".zoom-box");
    const zoomedImage = document.querySelector("#zoomedImage");

    zoomLens.classList.add("zoom-lens");
    mainImageContainer.appendChild(zoomLens);

    // Function to update zoom effect
    function updateZoom(event) {
        const { left, top, width, height } = mainImage.getBoundingClientRect();
        const x = event.clientX - left;
        const y = event.clientY - top;

        const lensWidth = zoomLens.offsetWidth / 2;
        const lensHeight = zoomLens.offsetHeight / 2;

        // Restrict lens movement inside the image
        const moveX = Math.max(0, Math.min(x - lensWidth, width - zoomLens.offsetWidth));
        const moveY = Math.max(0, Math.min(y - lensHeight, height - zoomLens.offsetHeight));

        zoomLens.style.left = moveX + "px";
        zoomLens.style.top = moveY + "px";

        // Calculate zoom position for zoomed image
        const zoomX = (moveX / (width - zoomLens.offsetWidth)) * 100;
        const zoomY = (moveY / (height - zoomLens.offsetHeight)) * 100;

        zoomedImage.style.transformOrigin = `${zoomX}% ${zoomY}%`;
        zoomedImage.style.transform = "scale(2)"; // Adjust zoom level here
    }

    // Mouse enter - show zoom effect
    mainImageContainer.addEventListener("mouseenter", function () {
        zoomLens.style.display = "block";
        zoomBox.style.display = "block";
    });

    // Mouse move - update zoom
    mainImageContainer.addEventListener("mousemove", updateZoom);

    // Mouse leave - reset zoom
    mainImageContainer.addEventListener("mouseleave", function () {
        zoomLens.style.display = "none";
        zoomBox.style.display = "none";
        zoomedImage.style.transform = "scale(1)";
    });

    // Image switch on thumbnail hover
    document.querySelectorAll(".small-image").forEach((image) => {
        image.addEventListener("mouseenter", function () {
            let newImage = this.getAttribute("data-image");

            mainImage.src = newImage;
            zoomedImage.src = newImage;
        });
    });
});
