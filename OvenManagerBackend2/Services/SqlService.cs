namespace OvenManagerBackend2.Services
{
    public class SqlService
    {
        private string connectionString = "Server=localhost\\SQLEXPRESS;Database=OvenDatabase;User=;password=;Encrypt=false;";

        //    public List<Oven> GetAllOvens()
        //    {
        //        List<Oven> allData = new List<Oven>();

        //        using (SqlConnection connection = new SqlConnection(connectionString))
        //        {
        //            connection.Open();

        //            // Récupérer les données de la table Oven
        //            string queryOven = "SELECT * FROM Oven";
        //            DataTable dataTableOven = new DataTable();
        //            using (SqlCommand commandOven = new SqlCommand(queryOven, connection))
        //            {
        //                using (SqlDataAdapter adapter = new SqlDataAdapter(commandOven))
        //                {
        //                    adapter.Fill(dataTableOven);
        //                }
        //            }

        //            // Ajouter les données de la table Oven à la liste des données
        //            foreach (DataRow row in dataTableOven.Rows)
        //            {

        //                var oven = new Oven();

        //                oven.id = (int)row["id"];
        //                oven.name = (string)row["name"];
        //                oven.property = new List<Property>();


        //                allData.Add(oven);
        //            }
        //        }

        //        return allData;
        //    }
    }
}
