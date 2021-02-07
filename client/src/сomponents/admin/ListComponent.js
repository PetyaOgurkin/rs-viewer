import React from 'react'
import { Button, ListGroup } from 'react-bootstrap'
import { Pencil, Trash } from 'react-bootstrap-icons';

export default function ListComponent({ list, editFunc, deleteFunc }) {
    return (
        <ListGroup style={{ maxHeight: '65vh', overflowY: 'auto', marginBottom: '2rem' }}>
            {list.map((e, i) => (<ListGroup.Item key={e._id} id={e._id}>
                <div className="admin__list__item">
                    <strong>{i + 1}.</strong>
                    <div>&nbsp;</div>
                    <span>{e.title}</span>
                    <div className="btn__group" style={{ marginLeft: "auto" }}>
                        <Button size="sm" variant="outline-dark" onClick={editFunc.bind(null, e._id)}><Pencil size={12} /></Button>
                        <Button size="sm" variant="outline-dark" onClick={deleteFunc.bind(null, e._id)}><Trash size={12} /></Button>
                    </div>
                </div>
            </ListGroup.Item>))}
        </ListGroup>
    )
}
