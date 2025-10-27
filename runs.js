const return_schema = [
	{
		athlete_id: 'xxx',
		runs: [
			{
				id: 'xxx',
				score: 0.0,
				judges: {}
			}
		]
	}
];

/** Returns runs based on highest score
 * @param {object} event - unmutated event object
 * @param {object} heat - umutated heat object
 * @return {array} runs sorted by highest score from high to low
 */
export const sort_by_highest_score = function (event, heat) {
	if (!event || !heat) return [];

	// Width Judges
	if (event.judges && event.judges.length) {
		const runs = Object.entries(heat.athletes)
			.map(([athlete_id, obj]) => {
				const athlete_runs = Object.values(obj.runs).map((run) => {
					const scores = Object.values(run.judges).sort((a, b) => b - a);

					return {
						...run,
						score: scores[0]
					};
				});

				const score = athlete_runs.sort((a, b) => b.score - a.score);

				return {
					athlete_id,
					runs: athlete_runs,
					score: score[0].score
				};
			})
			.sort((a, b) => b.score - a.score);

		return runs;
	}

	// Without Judges
	const runs = Object.entries(heat.athletes)
		.map(([athlete_id, obj]) => {
			const athlete_runs = Object.values(obj.runs).map((run) => ({
				...run,
				score: parseFloat(run.score)
			}));

			const score = athlete_runs.sort((a, b) => b.score - a.score);

			return {
				athlete_id,
				runs: athlete_runs,
				score: score[0].score
			};
		})
		.sort((a, b) => b.score - a.score);

	return runs;
};

/** Returns runs based on average score
 * @param {object} event - unmutated event object
 * @param {object} heat - umutated heat object
 * @return {array} runs sorted by average score from high to low
 */
export const sort_by_average_score = function (event, heat) {
	if (!event || !heat) return [];

	// With Judges
	if (event.judges && event.judges.length) {
		const runs = Object.entries(heat.athletes).map(([athlete_id, obj]) => {
			let total_runs = Object.keys(obj.runs).length;
			let athlete_runs = Object.values(obj.runs).map((run) => ({
				...run,
				score: parseFloat(run.score)
			}));

			let judge_scores = Object.values(obj.runs).map(
				(run) =>
					Object.values(run.judges).reduce((acc, curr) => acc + parseFloat(curr), 0) /
					event.judges.length
			);

			if (event.enabled.drop_lowest_score) {
				judge_scores = judge_scores.sort((a, b) => parseFloat(a) - parseFloat(b));
				judge_scores.shift();
				total_runs = total_runs - 1;
			}

			if (event.enabled.drop_highest_score) {
				judge_scores = judge_scores.sort((a, b) => parseFloat(b) - parseFloat(a));
				judge_scores.pop();
				total_runs = total_runs - 1;
			}

			const score = judge_scores.reduce((acc, curr) => acc + parseFloat(curr), 0) / total_runs;

			return {
				athlete_id,
				runs: athlete_runs,
				score
			};
		});

		return runs;
	}

	// Without Judges
	const runs = Object.entries(heat.athletes)
		.map(([athlete_id, obj]) => {
			let total_runs = Object.keys(obj.runs).length;
			let athlete_runs = Object.values(obj.runs).map((run) => ({
				...run,
				score: parseFloat(run.score)
			}));

			if (event.enabled.drop_lowest_score) {
				athlete_runs = athlete_runs.sort((a, b) => parseFloat(a.score) - parseFloat(b.score));
				athlete_runs.shift();
				total_runs = total_runs - 1;
			}

			if (event.enabled.drop_highest_score) {
				athlete_runs = athlete_runs.sort((a, b) => parseFloat(a.score) - parseFloat(b.score));
				athlete_runs.pop();
				total_runs = total_runs - 1;
			}

			const score =
				athlete_runs.reduce((acc, curr) => acc + parseFloat(curr.score), 0) / total_runs;

			return {
				athlete_id,
				runs: athlete_runs,
				score
			};
		})
		.sort((a, b) => b.score - a.score);

	return runs;
};
