import React from 'react'
import { getAngilal } from '@/myXata';
import { editAngilal } from '@/myXata';


export default async function EditChiglel() {

  const formattedData = await getAngilal();
  
    return (
        <ul>
          {formattedData.map((item: any) => (
            <form key={item.id} action={editAngilal} className="w-100% ">
              <li key={item.id} className='border'>
                <input
                  type="hidden"
                  name="id"
                  value={item.id}
                />
                <div className="flex justify-center">
                 
                  <input
                    name="urlagSalbar"
                    defaultValue={item.urlagSalbar}
                    className="border border-black h-10 w-1/2 border-opacity-25 mt-3"
                  />
                </div>
                <ul className="ml-10">
                  {item.urlagChiglel.map((ch: any) => (
                    <li key={ch}>
                      
                      <div className="flex justify-center"> 
                        <input
                          name="urlagChiglel"
                          defaultValue={ch}
                          className="border bg-[#ebeef9] border-black border-opacity-25 my-1 h-10 w-1/2"
                        />
                      </div>
                    </li>
                  ))}
                </ul>
                <div className='flex justify-center mb-5 mt-2'>
                  <button className="btn white-button">Хадгалах</button>
                </div>
              </li>
            </form>
          ))}
        </ul>
      );
}
