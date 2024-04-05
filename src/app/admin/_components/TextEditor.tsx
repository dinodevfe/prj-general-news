import React, { useEffect } from 'react'
import AlloyEditor from 'alloyeditor'

const EditorPage = () => {
  useEffect(() => {
    const editorConfig = {
      // Cấu hình của trình soạn thảo
    }

    const editorElement = document.getElementById('editor')

    AlloyEditor.editable(editorElement, editorConfig)
  }, [])

  return (
    <div>
      <h1>AlloyEditor Example</h1>
      <div id='editor'></div>
    </div>
  )
}

export default EditorPage
