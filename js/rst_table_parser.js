function RstTableParser() {

}

RstTableParser.prototype.getColumnMatchRegExp = function (line) {
	let columnWidths = line.substring(1, line.length - 1).split('+').map(cell => '\\|(.{' + cell.length + '})');

	return new RegExp('^' + columnWidths.join('') + '\\|$');
};

RstTableParser.prototype.blockTrim = function ($row) {
	let $ret = [];

	$.each($row, function ($index, $cell) {
		let $lines, $offset;

		$cell = $cell.trimEnd();

		if ( !$cell ) {
			$ret.push($cell);

			return;
		}

		$lines = $cell.split('\n');
		$offset = $lines[0].length - $lines[0].trimStart().length;

		if ( $offset === 0 ) {
			$ret.push($cell);

			return;
		}

		$ret.push(
			$lines.map($line => $line.substring($offset)).join('\n')
		);
	});

	return $ret;
};

RstTableParser.prototype.parse = function ($text) {
	let $ret = [],
		$lines = $text.trim().split('\n'),
		$current_row = [],
		$column_match_regexp = this.getColumnMatchRegExp($lines[0]);

	for ( let i = 0; i < $lines.length; i++ ) {
		let $line = $lines[i].trim();

		// Next row line, e.g. "+----+----+....+" or "+====+====+....+".
		if ( $line.startsWith('+') ) {
			if ( $current_row.length ) {
				$ret.push(this.blockTrim($current_row));
				$current_row = [];
			}

			continue;
		}

		let $cells = $line.match($column_match_regexp);
		$cells.shift(); // Remove the full match index.
		$cells = $cells.map($cell => $cell.trimEnd()); // Remove trailing whitespaces.

		if ( $current_row.length === 0 ) {
			$current_row = $cells;
		}
		else {
			$.each($cells, function ($index, $cell) {
				$current_row[$index] += '\n' + $cell;
			});
		}
	}

	return $ret;
};
