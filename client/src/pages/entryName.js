
export default function EntryName({ playerName, setPlayerName, handleWebsocket, nameError, setNameError }) {
  function handleSubmit(e) {
    e.preventDefault()
    let data = new FormData(e.target)
    let playerName = data.get("userName")
    if (!playerName || playerName.trim() === "") {
      setNameError("You need to provide a name")
      return
    }
    handleWebsocket()
  }

  return {
    tag: 'div',
    key: 'entryName-component-mainDiv',
    attrs: {
      className: 'mainDiv'
    },
    children: [
      {
        tag: 'div',
        key: 'EntryName-component-divLogo',
        attrs: {
          className: 'logo-bomber'
        },
        children: [
          {
            tag: 'section',
            key: 'EntryName-component-sectionLogo',
            attrs: {
              className: 'chars',
            },
            children: [
              {
                tag: 'div',
                key: 'EntryName-component-img1',
                attrs: {
                  className: 'image1',
                },
              },
              'BOMBERMAN DOM',
              {
                tag: 'div',
                key: 'EntryName-component-img2',
                attrs: {
                  className: 'image2',
                },
              },
            ]
          },
          
        ]
      },

      {
        tag: 'form',
        key: 'EntryName-component-form',
        attrs: {
          className: 'formidable',
          onsubmit: (e) => handleSubmit(e)
        },
        children: [
          {
            tag: 'label',
            key: 'EntryName-component-label',
            attrs: { htmlFor: 'userName' },
            children: [' Enter Your Name '],
          },
          {
            tag: 'input',
            key: 'EntryName-component-input',
            attrs: { id: 'userName', name: 'userName', type: 'text', value: playerName, oninput: (e) => setPlayerName(e.target.value) },
            children: [],
          },
          nameError ? { tag: 'span', key: 'EntryName-component-span', attrs: {className: 'errorName'}, children: [nameError] } : '',
        ],
      }
    ]
  }
}
