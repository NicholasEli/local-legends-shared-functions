/** Get active heat
 * @param {object} event - unmutated event object
 * @return {object|null|undefined} returns unmutated active heat if found
 */
export const get_active_heat = function (event) {
	if (!event?.heats) return null;

	const heats = Object.values(event.heats);
	const active_heat = heats.findLast((heat) => heat.active && !heat.complete);
	return active_heat;
};
