function RstTableGenerator() {
	this.padding = ' ';
}

RstTableGenerator.prototype.generate = function ($table_data) {
	let $me = this,
		$ret = '',
		$column_widths,
		$row_separator,
		$header_row_separator,
		$header_row;

	$table_data = this.splitByLines($table_data);
	$column_widths = this.detectColumnWidths($table_data);
	$row_separator = this.generateRowSeparator($column_widths, '-');
	$header_row_separator = this.generateRowSeparator($column_widths, '=');
	$header_row = $table_data.shift();

	// Build the header.
	$ret += $row_separator;
	$ret += this.generateRow($header_row, $column_widths, $header_row_separator);

	// Build the other rows.
	$.each($table_data, function ($row_index, $row) {
		$ret += $me.generateRow($row, $column_widths, $row_separator);
	});

	return $ret;
};

RstTableGenerator.prototype.splitByLines = function ($table_data) {
	let $ret = [];

	$.each($table_data, function ($row_index, $row) {
		$.each($row, function ($cell_index, $cell) {
			$row[$cell_index] = $cell.split('\n');
		});

		$ret.push($row);
	});

	return $ret;
};

RstTableGenerator.prototype.detectColumnWidths = function ($table_data) {
	let $me = this,
		$ret = [];

	$.each($table_data[0], function ($cell_index, $cell) {
		$ret.push(0);
	});

	$.each($table_data, function ($row_index, $row) {
		$.each($row, function ($cell_index, $cell_lines) {
			let $padded_cell_width = $me.getMaxLineLength($cell_lines) + $me.padding.length * 2;

			if ( $padded_cell_width > $ret[$cell_index] ) {
				$ret[$cell_index] = $padded_cell_width;
			}
		});
	});

	return $ret;
};

RstTableGenerator.prototype.generateRowSeparator = function ($column_widths, $filler) {
	let $me = this,
		$ret = '';

	$.each($column_widths, function ($column_index, $width) {
		$ret += '+' + ''.padEnd($width, $filler);
	});

	$ret += '+\n';

	return $ret;
};

RstTableGenerator.prototype.generateRow = function ($row, $column_widths, $separator) {
	const $max_cell_height = this.getMaxCellHeight($row);

	let $ret = '',
		$cell_value = '';

	for ( let $row_index = 0; $row_index < $max_cell_height; $row_index++ ) {
		for ( let $cell_index = 0; $cell_index < $row.length; $cell_index++ ) {
			$cell_value = $row[$cell_index][$row_index] || '';
			$cell_value = this.padding + $cell_value + this.padding;
			$cell_value = $cell_value.padEnd($column_widths[$cell_index]);

			$ret += '|' + $cell_value;
		}

		$ret += '|\n';
	}

	return $ret + $separator;
};

RstTableGenerator.prototype.getMaxCellHeight = function ($splitted_row) {
	let $ret = 0;

	$.each($splitted_row, function ($cell_index, $cell_lines) {
		let $cell_height = $cell_lines.length;

		if ( $cell_height > $ret ) {
			$ret = $cell_height;
		}
	});

	return $ret;
};

RstTableGenerator.prototype.getMaxLineLength = function ($lines) {
	let $ret = 0;

	$.each($lines, function ($line_index, $line) {
		if ( $line.length > $ret ) {
			$ret = $line.length;
		}
	});

	return $ret;
};
