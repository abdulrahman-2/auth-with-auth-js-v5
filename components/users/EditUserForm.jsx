import { editUser } from "@/lib/actions";
import { toast } from "sonner";

const EditUserForm = ({ formData }) => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await editUser(formData);
      toast.success("User updated successfully");
      setTimeout(() => {
        window.location.reload();
      }, 500);
      console.log("User updated successfully:", formData);
    } catch (error) {
      console.error("Error updating user:", error);
      toast.error("Error updating user");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <button
        type="submit"
        className="p-2 rounded-md text-white font-bold bg-blue-600 w-full"
      >
        Save
      </button>
    </form>
  );
};

export default EditUserForm;
