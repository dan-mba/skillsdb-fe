export default function mapData(data){
  let output = Object.keys(data).flatMap((key) => {
    return data[key].map((skill) => {
      return {
        skill,
        rating: key
      };
    });
  });

  return output.map((skill,index)=>{
    return {
      id: index,
      ...skill
    }
  });
}