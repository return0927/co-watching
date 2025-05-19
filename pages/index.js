const buttonCreate = document.getElementById("create");
const buttonJoin = document.getElementById("join");

buttonCreate.addEventListener("click", async () => {
  const resp = await window.API.createGroup();

  if (200 <= resp.status && resp.status < 300) {
    const data = await resp.json();
    const { id: groupId, accessKey } = data;
    localStorage.setItem("accessKey", accessKey);
    location.href = `/pages/indicator/index.html?mode=host&groupId=${groupId}`;
  }
});

buttonJoin.addEventListener("click", async () => {
  const groupId = prompt("그룹 ID를 입력해주세요.");
  
  const resp = await window.API.getGroup(groupId);
  if (200 <= resp.status && resp.status < 300) {
    location.href = `/pages/indicator/index.html?mode=guest&groupId=${groupId}`;
  } else {
    alert("올바르지 않은 그룹 ID입니다.");
  }
});
