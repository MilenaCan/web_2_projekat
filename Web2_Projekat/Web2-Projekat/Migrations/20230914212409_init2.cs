using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Web2_Projekat.Migrations
{
    /// <inheritdoc />
    public partial class init2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 1,
                column: "Password",
                value: "$2a$11$I7EFa9rc6rnz21NJqCQPWuETqhp.LGwwXZIUwqE5ypEvr3HewGdpm");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 2,
                column: "Password",
                value: "$2a$11$WLEfVIxFe0H1ipdUH/rieOc.qSZiMRNJeSIjzzcgdpr8LaMYWRkBS");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 3,
                column: "Password",
                value: "$2a$11$gyFn4KmdNZLjFctxTtdMKOXqN31TOfXmXvB7Jn82uQJthUSKsmzMi");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 1,
                column: "Password",
                value: "$2a$11$PcRW2NE5qWYkkkWBTr1zHeokKsFMq1jYTjncR6cw8ZKQ9XGPdnfXy");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 2,
                column: "Password",
                value: "$2a$11$Yw8LlY23P9p7jhWVHuiCxuFnrUB5JN0qCxH4g81g69p0eQNwdLEPq");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 3,
                column: "Password",
                value: "$2a$11$vQ/W5EprAlcElgnr.svjCeivJ0AgFWpWzUlqt98V6tCo3NMLZtORa");
        }
    }
}
