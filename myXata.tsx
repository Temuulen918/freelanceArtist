'use server'

import UstgahHuselt from './app/pages/ustgahHuselt/page';
import { getXataClient } from './src/xata';
import { revalidatePath } from 'next/cache';


export const getData = async (tableName: string) => {
  const xata = await getXataClient();
  const newData = await (xata.db as any)[`${tableName}`].getAll();
  return newData;
};

export const getSingleValue = async (id: any, tableName: any) => {
  const xata = await getXataClient();
  return (xata.db as any)[`${tableName}`].read(id)
}


////////// buteelch

export const addArtist = async (myData: FormData) => {
  const xata = await getXataClient();

  try {
    const tursunognooString = myData.get("tursunognoo") as string;
    const tursunognoo = new Date(tursunognooString);

    const dugaarString = myData.get("dugaar") as string;
    const dugaar = parseInt(dugaarString, 10);

    const nasbarsanesehString = myData.get("nasbarsaneseh") as string;
    const nasbarsaneseh = nasbarsanesehString === "Тийм";

    let nasbarsanognoo

    if (nasbarsaneseh === true) {
      const nasbarsanognooString = myData.get("nasbarsanognoo") as string;
      nasbarsanognoo = new Date(nasbarsanognooString);
    }

    await xata.db.buteelch.create({
      RD: myData.get("RD") as string,
      ner: myData.get("ner") as string,
      ovog: myData.get("ovog") as string,
      tursunognoo: tursunognoo,
      huis: myData.get("huis") as string,
      dugaar: dugaar,
      urlagSalbar: myData.get("urlagSalbar") as string,
      urlagChiglel: myData.get("urlagChiglel") as string,
      bolovsrol: myData.get("bolovsrol") as string,
      turshlaga: myData.get("turshlaga") as string,
      nasbarsaneseh: nasbarsaneseh,
      nasbarsanognoo: nasbarsanognoo,
      holboo: myData.get("holboo") as string
    });
  } catch (error) {
    console.error('Алдаа гарлаа:', error);
  }
  revalidatePath('pages/buteelchSan')
};



export const deleteArtist = async (myData: FormData) => {
  const xata = await getXataClient();

  try {
    const myID = myData.get('id') as string;
    await xata.db.buteelch.delete(myID);
  } catch (error) {
    console.error('Алдаа гарлаа:', error);
  }
  revalidatePath('pages/buteelchSan')
};


export const editArtist = async (formData: FormData) => {
  const xata = await getXataClient();

  const dugaarString = formData.get("dugaar") as string;
  const dugaar = parseInt(dugaarString, 10);

  const id = formData.get('id');
  const bolovsrol = formData.get('bolovsrol');
  const turshlaga = formData.get('turshlaga');

  const record = await xata.db.buteelch.update(id, {
    dugaar: dugaar,
    bolovsrol: bolovsrol,
    turshlaga: turshlaga,
  });
  revalidatePath('pages/buteelchSan')
}


/////////////////////////////// angilal


export const getUrlagSalbarOptions = async () => {
  const xata = await getXataClient();

  const records = await xata.db.angilal
    .select(["urlagSalbar"])
    .getAll();

  return records;
}

export const getUrlagChiglelOptions = async (urlagSalbar?: string) => {
  const xata = await getXataClient();
  if (!urlagSalbar) return [];

  const records = await xata.db.angilal
    .select(["urlagChiglel", "id"])
    .filter({ urlagSalbar })
    .getAll();

  const chiglelOptions = records.flatMap(record => record.urlagChiglel);

  return chiglelOptions;
}

interface Urlag {
  id: string;
  urlagSalbar: string;
  urlagChiglel: string[];
}


//ok
export async function getAngilal(): Promise<Urlag[]> {

  const xata = await getXataClient();
  const records = await xata.db.angilal.getAll() as Urlag[];

  const formattedData = records.reduce((acc, record) => {
    const { id, urlagSalbar, urlagChiglel } = record;
    acc[urlagSalbar] = acc[urlagSalbar] || { id, urlagSalbar, urlagChiglel: [] };
    acc[urlagSalbar].urlagChiglel.push(...urlagChiglel);
    return acc;
  }, {} as Record<string, Urlag>);

  return Object.values(formattedData);

}


//ok
export const editAngilal = async (formData: FormData) => {
  const xata = await getXataClient();

  const urlagSalbar = formData.get('urlagSalbar') as string;
  const urlagChiglel = [];

  for (const [fieldName, fieldValue] of formData.entries()) {
    if (fieldName.startsWith('urlagChiglel')) {
      urlagChiglel.push(fieldValue);
    }
  }

  const myID = formData.get('id') as string;

  await xata.db.angilal.update(myID, {
    urlagSalbar: urlagSalbar,
    urlagChiglel: urlagChiglel
  });
  revalidatePath('pages/angilalSan')
}



//ok
export const deleteSalbar = async (myData: FormData) => {
  const xata = await getXataClient();
  const all = await xata.db.angilal.getAll();
  const salbar = myData.get('urlagSalbar') as string;

  const matchingRecord = all.find((record) => record.urlagSalbar === salbar);

  if (matchingRecord) {
    const myID = matchingRecord.id;
    const record = await xata.db.angilal.delete(myID);

  } else {
    console.error('No matching urlagSalbar found.');
  }
}




//ok
export async function deleteChiglel(formData: FormData) {
  const xata = await getXataClient();
  const chiglel = formData.get('urlagChiglel') as string;

  const all = await xata.db.angilal.getAll();
  const matchingAngilal = all.find(angilal => angilal.urlagChiglel?.some(c => c === chiglel));

  if (matchingAngilal) {

    const filteredChiglel = matchingAngilal.urlagChiglel?.filter(c => c !== chiglel);
    const updatedAngilal = { ...matchingAngilal, urlagChiglel: filteredChiglel };

    await xata.db.angilal.update(matchingAngilal.id, updatedAngilal);
  }
}




//ok
export async function addSalbar(myData: FormData) {
  const xata = await getXataClient();

  try {
    const salbar = myData.get('newSalbar') as string;
    const chiglel = myData.get('newChiglel') as string;

    await xata.db.angilal.create({
      urlagSalbar: salbar,
      urlagChiglel: [chiglel]
    });

  } catch (error) {

    console.error('Алдаа гарлаа:', error);

  }
}


//ok
export async function addChiglel(myData: FormData) {
  const xata = await getXataClient();

  const all = await xata.db.angilal.getAll();
  const salbar = myData.get('urlagSalbar') as string;

  const matchingRecord = all.find((record) => record.urlagSalbar === salbar);

  if (matchingRecord) {
    const myID = matchingRecord.id;
    const newValue = myData.get('danChiglel') as string;

    const record = await xata.db.angilal.read(myID);
    const urlagChiglel = record?.urlagChiglel;

    if (urlagChiglel) {
      urlagChiglel.push(newValue);

      try {
        await xata.db.angilal.update(myID, {
          urlagChiglel,
        });
      } catch (error) {
        console.error('Error adding chiglel:', error);
      }
    }
  }
}

////////////////////////////// buteel


//ok
export const addArtwork = async (myData: FormData) => {
  const xata = await getXataClient();

  const tuurvijduussanString = myData.get("tuurvijduussan") as string;
  const tuurvijduussan = new Date(tuurvijduussanString);

  const zohiogchiinerhString = myData.get("zohiogchiinerh") as string;
  const zohiogchiinerh = parseInt(zohiogchiinerhString, 10);


  const buteelchids: string[] = [];
  const keys = Array.from(myData.keys());
  for (let key of keys) {
    if (key.startsWith('buteelchid-')) {
      const buteelchid = myData.get(key) as string;
      buteelchids.push(buteelchid);
    }
  }

  const ner = myData.get("ner") as string;

  await xata.db.buteel.create({
    ner: ner,
    tailbar: myData.get("tailbar") as string,
    tuurvijduussan: tuurvijduussan,
    zohiogchiinerh: zohiogchiinerh,
    link: myData.get("link") as string,
    huselteseh: true,
    buteelchid: buteelchids,
    urlagSalbar: myData.get("urlagSalbar") as string,
    urlagChiglel: myData.get("urlagChiglel") as string,
  });

  const ehNer = myData.get('ehNer');
  if (ehNer) {
    const ehbuteelner = myData.get('ehbuteelner');
    const ehNer = myData.get('ehNer');
    const ehovog = myData.get('ehovog');
    const hel = myData.get('hel');
    const ehlink = myData.get('ehlink');
    const ehtailbar = myData.get('ehtailbar');

    const records = await xata.db.buteel.getAll();
    const foundRecord = records.find((record: any) => record.ner === ner);

    
    await xata.db.uusmel.create({
      buteelid: foundRecord?.id,
      ehbuteelner: ehbuteelner,
      ovog: ehovog,
      ner: ehNer,
      hel: hel,
      link: ehlink,
      tailbar: ehtailbar,
    });
  }
};



export const editArtwork = async (formData: FormData) => {
  const xata = await getXataClient();

  const zohiogchiinerhString = formData.get("zohiogchiinerh") as string;
  const zohiogchiinerh = parseInt(zohiogchiinerhString, 10);

  const id = formData.get('id') as string;
  const tailbar = formData.get('tailbar') as string;
  const link = formData.get('link') as string;

  const record = await xata.db.buteel.update(id, {
    zohiogchiinerh: zohiogchiinerh,
    tailbar: tailbar,
    link: link,
  });
  revalidatePath('pages/buteelSan')
}


export const deleteArtwork = async (myData: FormData) => {
  const xata = await getXataClient();

  try {
    const myID = myData.get('id') as string;
    await xata.db.buteel.delete(myID);
  } catch (error) {
    console.error('Алдаа гарлаа:', error);
  }
  revalidatePath('pages/buteelSan')
};


////////////////////// holboo

export const editHolboo = async (formData: FormData) => {
  const xata = await getXataClient();

  const utasString = formData.get("utas") as string;
  const utas = parseInt(utasString, 10);

  const id = formData.get('id');
  const TUZdarga = formData.get('TUZdarga');
  const hayg = formData.get('hayg');
  const tsahimhayg = formData.get('tsahimhayg');
  const tsahimshuudan = formData.get('tsahimshuudan');

  await xata.db.holboo.update(id, {
    TUZdarga: TUZdarga,
    hayg: hayg,
    tsahimhayg: tsahimhayg,
    utas: utas,
    tsahimshuudan: tsahimshuudan,
  });
  revalidatePath('pages/holbooSan')
}


export const deleteHolboo = async (myData: FormData) => {
  const xata = await getXataClient();

  try {
    const myID = myData.get('id') as string;
    await xata.db.holboo.delete(myID);
  } catch (error) {
    console.error('Алдаа гарлаа:', error);
  }
  revalidatePath('pages/holbooSan')
};

export const addHolboo = async (myData: FormData) => {
  const xata = await getXataClient();

  try {
    const ognooString = myData.get("uusgenbaiguulsan") as string;
    const uusgenbaiguulsan = new Date(ognooString);

    const dugaarString = myData.get("utas") as string;
    const dugaar = parseInt(dugaarString, 10);

    await xata.db.holboo.create({
      ner: myData.get("ner") as string,
      burtgelDugaar: myData.get("burtgelDugaar") as string,
      TUZdarga: myData.get("TUZdarga") as string,
      hayg: myData.get("hayg") as string,
      uilajillagaa: myData.get("uilajillagaa") as string,
      tsahimhayg: myData.get("tsahimhayg") as string,
      uusgenbaiguulsan: uusgenbaiguulsan,
      utas: dugaar,
      tsahimshuudan: myData.get("tsahimshuudan") as string,
      huselteseh: true,
    });
  } catch (error) {
    console.error('Алдаа гарлаа:', error);
  }
  revalidatePath('pages/buteelchSan')
};


////////////////////////////// ajiltan


export const editAjiltan = async (formData: FormData) => {
  const xata = await getXataClient();

  const utasString = formData.get("utas") as string;
  const utas = parseInt(utasString, 10);

  await xata.db.ajiltan.update(id, {
    utas: utas,
  });
  revalidatePath('pages/holbooSan')
}

export const deleteAjiltan = async (myData: FormData) => {
  const xata = await getXataClient();

  try {
    const myID = myData.get('id') as string;
    await xata.db.ajiltan.delete(myID);
  } catch (error) {
    console.error('Алдаа гарлаа:', error);
  }
  revalidatePath('pages/holbooSan')
};


export const addAjiltan = async (formData: FormData) => {
  const xata = await getXataClient();

  try {
    const ognooString = formData.get("tursunognoo") as string;
    const ognoo = new Date(ognooString);

    const dugaarString = formData.get("utas") as string;
    const dugaar = parseInt(dugaarString, 10);

    await xata.db.ajiltan.create({
      ner: formData.get('ner') as string,
      ovog: formData.get('ovog') as string,
      huis: formData.get('huis') as string,
      RD: formData.get('RD') as string,
      tursunognoo: ognoo,
      utas: dugaar,
    });
  } catch (error) {
    console.error('Алдаа гарлаа:', error);
  }
  revalidatePath('pages/ajiltanSan')
};


export const findAccount = async (username: any) => {
  const xata = await getXataClient();

  const accounts = await xata.db.account.select(["username", "accid"]).getAll();

  const matchingAcc = accounts.find((accounts) => accounts.username === username);

  return matchingAcc?.accid
};



//////////////////////////////////////dashboard

export const CountButeelch = async () => {

  const xata = await getXataClient();

  const count = await xata.db.buteelch.aggregate({
    buteelchid: {
      count: {
        filter: {
          huselteseh: false
        }
      }
    }
  });

  return <>{count.aggs.buteelchid}</>
}


export const CountButeelchAmid = async () => {

  const xata = await getXataClient();

  const count = await xata.db.buteelch.aggregate({
    buteelchid: {
      count: {
        filter: {
          huselteseh: false,
          nasbarsaneseh: false
        }
      }
    }
  });

  return <>{count.aggs.buteelchid}</>
}


export const CountButeel = async () => {

  const xata = await getXataClient();

  const count = await xata.db.buteel.aggregate({
    buteeluud: {
      count: {
        filter: {
          huselteseh: false
        }
      }
    }
  });

  return <>{count.aggs.buteeluud}</>
}



export const CountHolboo = async () => {

  const xata = await getXataClient();

  const count = await xata.db.holboo.aggregate({
    holbood: {
      count: {
        filter: {
          huselteseh: false
        }
      }
    }
  });

  return <> {count.aggs.holbood}</>
}


interface MonthlyCount {
  [month: number]: number;
}


export const countBchMonth = async (): Promise<number[]> => {

  const xata = getXataClient();
  const allButeelch = await xata.db.buteelch.getAll();

  const monthlyCount = new Array(12).fill(0);

  for (const buteelch of allButeelch) {
    const createdAt = new Date(buteelch.xata.createdAt);
    const year = createdAt.getFullYear();
    const month = createdAt.getMonth();

    if (year === 2024) {
      monthlyCount[month]++;
    }
  }

  return monthlyCount;
};


export const countBchYear = async (): Promise<string[]> => {
  const xata = getXataClient();
  const allButeelch = await xata.db.buteelch.getAll();

  const currentYear = new Date().getFullYear();
  const yearCounts: Record<number, number> = {};

  for (const buteelch of allButeelch) {
    const createdAt = new Date(buteelch.xata.createdAt);
    const year = createdAt.getFullYear();
    const month = createdAt.getMonth();

    if (year >= currentYear - 4 && year <= currentYear) {
      yearCounts[year] = yearCounts[year] || 0;
      yearCounts[year] += 1;
    }
  }

  const result: string[] = [];
  for (let year = currentYear - 4; year <= currentYear; year++) {
    result.push(`${yearCounts[year] || 0}`);
  }

  return result;
};




export const countBMonth = async (): Promise<number[]> => {

  const xata = getXataClient();
  const allButeel = await xata.db.buteel.getAll();

  const monthlyCount = new Array(12).fill(0);

  for (const buteel of allButeel) {
    const createdAt = new Date(buteel.xata.createdAt);
    const year = createdAt.getFullYear();
    const month = createdAt.getMonth();

    if (year === 2024) {
      monthlyCount[month]++;
    }
  }

  return monthlyCount;
};



export const countBYear = async (): Promise<string[]> => {
  const xata = getXataClient();
  const allButeel = await xata.db.buteel.getAll();

  const currentYear = new Date().getFullYear();
  const yearCounts: Record<number, number> = {};

  for (const buteel of allButeel) {
    const createdAt = new Date(buteel.xata.createdAt);
    const year = createdAt.getFullYear();
    const month = createdAt.getMonth();

    if (year >= currentYear - 4 && year <= currentYear) {
      yearCounts[year] = yearCounts[year] || 0;
      yearCounts[year] += 1;
    }
  }

  const result: string[] = [];
  for (let year = currentYear - 4; year <= currentYear; year++) {
    result.push(`${yearCounts[year] || 0}`);
  }

  return result;
};

export const countHYear = async (): Promise<string[]> => {
  const xata = getXataClient();
  const allHolboo = await xata.db.holboo.getAll();

  const currentYear = new Date().getFullYear();
  const yearCounts: Record<number, number> = {};

  for (const holboo of allHolboo) {
    const createdAt = new Date(holboo.xata.createdAt);
    const year = createdAt.getFullYear();
    const month = createdAt.getMonth();

    if (year >= currentYear - 4 && year <= currentYear) {
      yearCounts[year] = yearCounts[year] || 0;
      yearCounts[year] += 1;
    }
  }

  const result: string[] = [];
  for (let year = currentYear - 4; year <= currentYear; year++) {
    result.push(`${yearCounts[year] || 0}`);
  }

  return result;
};



export const countBchHuis = async () => {

  const xata = await getXataClient();
  const newData = await xata.db.buteelch.getAll();

  let er = 0;
  let em = 0;

  for (const person of newData) {
    if (person.huis === "Эр" && !person.huselteseh) {
      er++;
    } else if (person.huis === "Эм" && !person.huselteseh) {
      em++;
    }
  }

  return {
    er,
    em,
  };
};



export async function countUrlagSalbar() {

  const newData = await getXataClient().db.buteel.getAll();


  const urlagSalbarCounts: { [key: string]: number } = {};
  newData.forEach(item => {
    const urlagSalbar = item.urlagSalbar;
    if (urlagSalbar) {
      urlagSalbarCounts[urlagSalbar] = (urlagSalbarCounts[urlagSalbar] || 0) + 1;
    }
  });


  const sortedCounts = Object.entries(urlagSalbarCounts).sort((a, b) => b[1] - a[1]);

  const top5Salbars = sortedCounts.slice(0, 5);

  const restCount = sortedCounts.slice(5).reduce((acc, cur) => acc + cur[1], 0);

  return {
    top5Salbars,
    restCount,
  }
}


export async function countNas() {
  const xata = await getXataClient();
  const records = await xata.db.buteelch.getAll();

  const currentDate = new Date();
  const ageGroups = {
    "5-18": 0,
    "19-25": 0,
    "26-40": 0,
    "40+": 0
  };

  records.forEach(record => {
    if (record.tursunognoo) {
      const birthDate = new Date(record.tursunognoo);
      const age = currentDate.getFullYear() - birthDate.getFullYear();

      if (age >= 5 && age <= 18) {
        ageGroups["5-18"]++;
      } else if (age >= 19 && age <= 25) {
        ageGroups["19-25"]++;
      } else if (age >= 26 && age <= 40) {
        ageGroups["26-40"]++;
      } else {
        ageGroups["40+"]++;
      }
    }
  });

  return ageGroups;
}


//////////////////////////////burtgel huselt

export const deleteArtworkReq = async (formData: FormData) => {

  const xata = await getXataClient();
  const id = formData.get('id') as string;

  try {
    await xata.db.buteel.delete(id);
  } catch (error) {
    console.error('Алдаа гарлаа:', error);
  }
  revalidatePath('pages/huseltSan')
};


export const acceptArtworkReq = async (formData: FormData) => {
  const xata = await getXataClient();
  const id = formData.get('id') as string;

  const record = await xata.db.buteel.update(id, {
    huselteseh: false,
  });
}


//


export const deleteArtistReq = async (formData: FormData) => {

  const xata = await getXataClient();
  const id = formData.get('id') as string;

  try {
    await xata.db.buteelch.delete(id);
  } catch (error) {
    console.error('Алдаа гарлаа:', error);
  }
  revalidatePath('pages/huseltSan')
};


export const acceptArtistReq = async (formData: FormData) => {
  const xata = await getXataClient();
  const id = formData.get('id') as string;

  const record = await xata.db.buteelch.update(id, {
    huselteseh: false,
  });
}


//



export const deleteHolbooReq = async (formData: FormData) => {

  const xata = await getXataClient();
  const id = formData.get('id') as string;

  try {
    await xata.db.holboo.delete(id);
  } catch (error) {
    console.error('Алдаа гарлаа:', error);
  }
  revalidatePath('pages/huseltSan')
};


export const acceptHolbooReq = async (formData: FormData) => {
  const xata = await getXataClient();
  const id = formData.get('id') as string;

  const record = await xata.db.holboo.update(id, {
    huselteseh: false,
  });
}


////


export const deleteReasonAcc = async (formData: FormData) => {
  const idbuteelch = formData.get('idbuteelch') as string;
  const reason = formData.get('reason') as string;

  const xata = await getXataClient();

  await xata.db.buteelch.update(idbuteelch, {
    ustgahtailbar: reason,
  })
}

export const cancelDelete = async (formData: FormData) => {
  const type = formData.get("type") as string;
  const id = formData.get("id") as string;

  const xata = await getXataClient();
  await (xata.db as any)[`${type}`].update(id, {
    ustgahtailbar: null,
  })
}

export const acceptDelete = async (formData: FormData) => {
  const type = formData.get("type") as string;
  const id = formData.get("id") as string;

  const xata = await getXataClient();
  await (xata.db as any)[`${type}`].delete(id);
}


/////

export const searchbuteel = async (word: any) => {

  const xata = await getXataClient();

  const results = await xata.db.buteel.search(word, {
    fuzziness: 2
  });

  return results
}




