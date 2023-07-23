const consoleUtil = {
    info: (str: string, color?: string) => {
        console.log(`%c-------------${str}--------------`, `color:${color ?? 'green'}`);
    },
    debug: (data: any, info?: string) => {
        console.log(`%c${info ?? ""}=============>>> ${data}`, "padding:10px;border:2px solid blue");
    },
}

export default consoleUtil
