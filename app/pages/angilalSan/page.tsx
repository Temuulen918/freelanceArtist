import React from 'react';
import Modal from '@/app/components/modal';
import EditChiglel from '@/app/components/editChiglel';
import DeleteAngilal from '@/app/components/deleteAngilal';
import AddAngilal from '@/app/components/addAngilal';
import { getSession } from '@/src/actions';
import { redirect } from 'next/navigation';


export default async function AngilalSan() {
  const session = await getSession();

  if (!session.isLoggedIn) {
    redirect("/")
  }

  if (session.type !== "admin") {
    redirect("/pages/profile")
  }


  return (
    <div className="myform">
      <div className='flex justify-end gap-3 mb-4'>
        <Modal buttonText='Салбар, чиглэл нэмэх'>
          <AddAngilal />
        </Modal>
        <Modal buttonText='Салбар, чиглэл устгах' >
          <DeleteAngilal />
        </Modal>
      </div>
      <div>
        <EditChiglel />
      </div>
    </div>
  );
}

