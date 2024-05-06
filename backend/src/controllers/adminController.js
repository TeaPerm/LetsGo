export async function adminController(supabase) {
  return {
    async getUsers() {
      try {
        const {
          data: { users },
          error,
        } = await supabase.listUsers();

        if (error) {
          throw new Error(error.message);
        }

        return { data: { users }, error: null };
      } catch (error) {
        console.error("Error fetching users:", error);
        return { data: null, error: error.message };
      }
    },
    async getUser(userId) {
      try {

        const { data, error } = await supabase.getUserById(userId);

        if (error) {
          throw new Error(error.message);
        }

        return { data, error: null };
      } catch (error) {
        console.error("Error fetching user:", error);
        return { data: null, error: error.message };
      }
    },
  };
}
