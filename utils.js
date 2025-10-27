/**
 * Creates aribtrary wait time based on miliseconds
 * @param { int } milliseconds
 * @return { promise } resolves once time has been reached
 * */
export const async_timeout = function (ms) {
	return new Promise((resolve) => setTimeout(resolve, ms));
};
