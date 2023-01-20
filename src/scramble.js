const puzzleSelector = $("#puzzle-selector"),
      scrambleButton = $("#next-scramble"),
      scrambleText = $("#scramble-text");

function updateScramble() {
    const puzzle = puzzleSelector.val();

    axios.get(`/s/${puzzle}`)
        .then(response => {
            let textSize = "68px";
            switch (puzzle) {
                case "2x2":
                    textSize = "58px";
                    break;
                case "3x3":
                    textSize = "46px";
                    break;
                case "4x4":
                    textSize = "30px";
                    break;
                case "5x5":
                    textSize = "24px";
                    break;
                case "6x6":
                    textSize = "18px";
                    break;
                case "7x7":
                    textSize = "16px";
                    break;
                case "3x3x2":
                    textSize = "46px";
                    break;
            }
            scrambleText.css("font-size", textSize);
            scrambleText.html(response["data"]);

            axios.get(`/i/${puzzle}/${response["data"]}`)
                .then(response => {
                    const colors = response["data"],
                          canvas = $("#scramble-image")[0],
                          c = canvas.getContext("2d");

                    c.clearRect(0, 0, canvas.width, canvas.height);

                    switch (puzzle) {
                        case "2x2":
                            i2x2(c, colors);
                            break;
                        case "3x3":
                            i3x3(c, colors);
                            break;
                        case "4x4":
                            i4x4(c, colors);
                            break;
                        case "3x3x2":
                            i3x3x2(c, colors);
                            break;
                    }
                });
        });
}

updateScramble();
puzzleSelector.change(updateScramble);
scrambleButton.click(updateScramble);
