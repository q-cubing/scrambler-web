const menu = $("#menu"),
      menuButton = $("#menu-button"),
      main = $(".main"),
      dnf = $("#dnf"),
      plus2 = $("#plus2"),
      remove = $("#remove");

menuButton.click(() => {
    menu.css("display", "flex");

    [...main].map((element) => element.style.filter = "grayscale(100%)");
});
menu.click((event) => {
    if (event.target == menu[0]) {
        menu.css("display", "none");
        [...main].map((element) => element.style.filter = "grayscale(0%)");
    }
});
remove.click(() => {
    table.find("tr")[0].remove();
    solves.pop();
    n -= 1;
    ao5 = undefined;
    ao12 = undefined;
});
plus2.click(() => {
    const solve = parseFloat(solves.slice(-1)) + 2;
    console.log(solve);
    table
        .find("tr")
        .find("td")[1]
        .innerHTML = `${solve.toFixed(2)} [+]`;
    solves.pop();
    solves.push(solve);
});
dnf.click(() => {
    table
        .find("tr")
        .find("td")[1]
        .innerHTML = "DNF";
    solves.pop();
    solves.push("DNF");
});
