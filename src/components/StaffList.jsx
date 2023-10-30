const staffList = ({
  firstName,
  lastName,
  contactNo,
  contactEmail,
  companyRole,
  dateOfBirth,
}) => {
  return (
    <div className="flex flex-col lg:flex-row justify-between bg-green-100 p-2 border-b-2 border-slate-400 [&>*]:basis-1/5 lg:[&>*]:text-center">
      <p className="">
        {firstName} {lastName}
      </p>
      <p>{contactNo}</p>
      <p>{contactEmail}</p>
      <p>{companyRole}</p>
      <p>{dateOfBirth}</p>
    </div>
  );
};

export default staffList;
