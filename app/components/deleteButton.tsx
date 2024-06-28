import { deleteArtist, deleteArtwork, deleteHolboo, deleteAjiltan} from '@/myXata';
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';


export const DeleteButton = async ({ id }: any) => { //buteelch
    return (

        <form action={deleteArtist}>
            <input type='hidden' name='id' value={id} />
            <button><FontAwesomeIcon icon={faTrashCan} size='2x' color='#9B9B9B ' /></button>
        </form>
    );
};


export const DeleteButton1 = async ({ id }: any) => { //buteel
    return (

        <form action={deleteArtwork}>
            <input type='hidden' name='id' value={id} />
            <button><FontAwesomeIcon icon={faTrashCan} size='2x' color='#9B9B9B ' /></button>
        </form>
    );
};

export const DeleteButton2 = async ({ id }: any) => { //holboo
    return (

        <form action={deleteHolboo}>
            <input type='hidden' name='id' value={id} />
            <button><FontAwesomeIcon icon={faTrashCan} size='2x' color='#9B9B9B ' /></button>
        </form>
    );
};

export const DeleteButton3 = async ({ id }: any) => { //holboo
    return (

        <form action={deleteAjiltan}>
            <input type='hidden' name='id' value={id} />
            <button><FontAwesomeIcon icon={faTrashCan} size='2x' color='#9B9B9B ' /></button>
        </form>
    );
};