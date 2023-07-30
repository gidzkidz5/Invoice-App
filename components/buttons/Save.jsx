export function SaveSendButton(props) {
    return (
        <button onClick={props.onClick} className="send ff-sanserif fs-S2">Save & Send</button>
    )
}

export function SaveDraftButton(props) {
    return (
        <button onClick={props.onClick} className="draft ff-sanserif fs-S2 light">Save as Draft</button>
    )
}
