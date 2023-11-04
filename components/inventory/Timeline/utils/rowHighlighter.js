const applyClassToMatchingRows = (tables, row0, row1, action) => {
  tables.forEach((table) => {
    table.forEach((row, index) => {
      if (
        row &&
        row[0].trim().toLowerCase() === row0.trim().toLowerCase() &&
        row[1].trim().toLowerCase() === row1.trim().toLowerCase()
      ) {
        const trElements = document.querySelectorAll(`.table-row-${index}`)
        trElements.forEach((trElement) => {
          if (action === 'highlight') {
            trElement.classList.add('bg-yellow-300', 'transition-transform')
          } else {
            trElement.classList.remove('bg-yellow-300', 'transition-transform')
          }
        })
      }
    })
  })
}

export const highlightMatchingRows = (tables, row0, row1) => {
  applyClassToMatchingRows(tables, row0, row1, 'highlight')
}

export const clearMatchingRowHighlights = (tables, row0, row1) => {
  applyClassToMatchingRows(tables, row0, row1, 'clear')
}
