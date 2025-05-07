# Table Editor

Browser-based editor for creating, editing, and converting reStructuredText (RST) tables with ease.

## Overview

Table Editor is a browser-based tool that provides a user-friendly interface for working with RST tables. 
It allows you to import existing RST table markup, edit it in a spreadsheet-like interface, and export 
it back to properly formatted RST table syntax.

## Features

- **Import RST Tables**: Paste your existing RST table markup and convert it to an editable grid
- **Interactive Editor**: Spreadsheet-like interface for easy data manipulation
- **Export to RST**: Convert your edited table back to properly formatted RST markup
- **No Server Required**: Runs entirely in the browser with no backend dependencies
- **Responsive Layout**: Works on desktop and mobile devices
- **Grid Features**:
  - Editable cells 
  - Resizable rows and columns using resize handles
  - Multi-line text support
- **Generator Features**: 
  - Automatic content horizontal padding with one space
  - Leading whitespaces are preserved
  - Table markup symbols (e.g., `|`, `-`, `+`, `=`) can be safely used in the cell content

## Usage

1. **Import**: Paste your RST table markup in the ```1. Importable RST Table``` textarea (on the left) and 
   click the ```Import from Markup``` button below it
2. **Edit**: Use the spreadsheet interface to modify your table data
   - Single-click on a cell to edit its content
   - Shift-Enter in a cell (or click elsewhere) to save changes
   - Double-click on the resize handle to auto-resize column/row based on content
   - Resize any column a bit to remove that extra space at the bottom
   - Drag and drop to reorder rows and columns using their headers (e.g. `A`, `B`, `C`, `1`, `2`, `3`)
3. **Export**: Click the ```Export to Clipboard``` button below the ```3. Exported RST Table``` textarea 
   (on the right) to generate the updated RST table markup in that textarea and copy it to your clipboard

## Example RST Table Format

```rst
+------------------------+----------+----------+----------+
| Header row, column 1   | Header 2 | Header 3 | Header 4 |
| (header rows optional) |          |          |          |
+========================+==========+==========+==========+
| body row 1,            | column 2 | column 3 | column 4 |
| column 1               |          |          |          |
+------------------------+----------+----------+----------+
| body row 2             | ...      | ...      |          |
+------------------------+----------+----------+----------+
```

## Acknowledgments

Special thanks to [Tabulator](https://tabulator.info/) for their amazing table editing component.
