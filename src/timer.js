const timer = $("#timer")[0],
      stopColor = timer.style.color,
      table = $("#solves-table"),
      menuHeader = $("#menu-header")[0];

let solves = [],
    isTimerOn = false,
    interval,
    currentTime = 0,
    n = 0,
    ao5 = undefined,
    ao12 = undefined,
    mean = $("#mean");

function resetTimer() {
    if (isTimerOn) {
        clearInterval(interval);
        startTime = Date.now();

        const timePretty = timer.innerHTML;
        solves.push(parseFloat(currentTime));
        n += 1;
        updateScramble();

        const clearSolves = solves.filter((x) => x != "DNF");
        mean.html(`mean: ${(clearSolves.reduce((sum, x) => sum + x, 0) / clearSolves.length).toFixed(2)}`);

        if (solves.length >= 5) {
            const five = solves.slice(-5).sort(),
                  dnfOccurences = five.reduce(((acc, x) => acc + (x == "DNF" ? 1 : 0)), 0);

            if (dnfOccurences > 1) {
                ao5 = "DNF";
            } else {
                if (dnfOccurences == 1) {
                    five.pop();
                    five.push(five.sort().at(-2) + 1);
                }
                ao5 = (five
                    .filter(x => x != five[0] && x != five.at(-1))
                    .reduce((sum, x) => sum + x, 0) / 3).toFixed(2);
            }
        }

        if (solves.length >= 12) {
            const twelve = solves.slice(-12).sort(),
                  dnfOccurences = twelve.reduce(((acc, x) => acc + (x == "DNF" ? 1 : 0)), 0);

            if (dnfOccurences > 1) {
                ao12 = "DNF";
            } else {
                if (dnfOccurences == 1) {
                    twelve.pop();
                    twelve.push(twelve.sort().at(-2) + 1);
                }
                ao12 = (twelve
                        .filter(x => x != twelve[0] && x != twelve.at(-1))
                        .reduce((sum, x) => sum + x, 0) / 10).toFixed(2);
            }
        }

        menuHeader.innerHTML = `solve #${n}`;

        table.prepend(`
                        <tr class="text-center">
                            <td class="border-2 border-[#444455] text-center">${n}</td>
                            <td class="border-2 border-[#444455]">${timePretty}</td>
                            <td class="border-2 border-[#444455]">${ao5 ? ao5 : "-"}</td>
                            <td class="border-2 border-[#444455]">${ao12 ? ao12 : "-"}</td>
                        </tr>
                     `);
    } else {
        const startTime = Date.now();
        interval = setInterval(() => {
            const elapsedTime = Date.now() - startTime,
                time = (elapsedTime / 1000);

            if (time >= 60) {
                const sec = time % 60,
                    min = (time - sec) / 60;
                timer.innerHTML = `${min}:${sec.toFixed(2).padStart(5, "0")}`;
            } else {
                timer.innerHTML = (elapsedTime / 1000).toFixed(2);
            }

            currentTime = time;
        }, 10);
    }
    isTimerOn = !isTimerOn;
}

document.addEventListener("keydown", (e) => {
    if (e.code == "Space" && e.repeat) {
        timer.style.color = "#FFEE00";
        e.preventDefault();
    }
});
document.addEventListener("keyup", ({
    code,
    ctrlKey
}) => {
    if (code == "Space") {
        timer.style.color = stopColor;
        resetTimer();
    }
    if (code == "KeyZ" && ctrlKey) {
        table.find("tr")[0].remove();
        solves.pop();
        n -= 1;
        ao5 = undefined;
        ao12 = undefined;
    }
});
