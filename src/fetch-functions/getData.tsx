import { useQuery } from "@tanstack/react-query";
const fetchGroups = async () => {
  const response = await fetch(
    "https://ms-teams-app-ba042-default-rtdb.firebaseio.com/groups.json"
  );
  return await response.json();
};

const GetData = () => {
  const { data } = useQuery({
    queryKey: ["groups"],
    queryFn: fetchGroups,
  });

  // console.log(data);
  const dataArr = [];
  console.log(data);
  for (let i in data) {
    const groupUsers = [];
    for (let j in data[i].groupUsers) {
      groupUsers.push({
        id: j,
        username: data[i].groupUsers[j].username,
        email: data[i].groupUsers[j].email,
      });
    }
    dataArr.push({
      id: i,
      restaurantName: data[i].restaurantName,
      restaurantLogo: data[i].restaurantLogo,
      time: data[i].time,
      groupUsers,
    });
  }

  return dataArr;
};

export default GetData;
