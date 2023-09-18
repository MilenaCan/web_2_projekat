using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Web2_Projekat.Migrations
{
    /// <inheritdoc />
    public partial class init1 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<DateTime>(
                name: "OrderTime",
                table: "Orders",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(2023, 9, 18, 18, 47, 25, 447, DateTimeKind.Local).AddTicks(7345),
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldDefaultValue: new DateTime(2023, 9, 15, 13, 43, 44, 517, DateTimeKind.Local).AddTicks(2693));

            migrationBuilder.UpdateData(
                table: "Orders",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "DeliveryTime", "OrderTime" },
                values: new object[] { new DateTime(2023, 9, 18, 20, 46, 25, 448, DateTimeKind.Local).AddTicks(3164), new DateTime(2023, 9, 18, 18, 47, 25, 447, DateTimeKind.Local).AddTicks(7345) });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 1,
                column: "Name",
                value: "Grozdje");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "Address", "Password" },
                values: new object[] { "Adresa 1", "$2a$11$G5lBW1ns/wAtlryyOQ7KsuOAtMT2hnb51W/orgC/a1w.xbjggb1la" });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "Address", "FullName", "Password", "Username" },
                values: new object[] { "Adresa 2", "Prodavac Prodavac", "$2a$11$AAIowVQV/m6useY.H.MD4OdXUes97SbkDeDCEGYtV.yZ81k1IokF2", "prodavac" });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "Address", "FullName", "Password", "Username" },
                values: new object[] { "Adresa 3", "Kupac Kupac", "$2a$11$MwrYKhHMcTpYblRqCrO1Fu/iCAYQ0VJC74b3.LcntfflypxEPWo2S", "kupac" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<DateTime>(
                name: "OrderTime",
                table: "Orders",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(2023, 9, 15, 13, 43, 44, 517, DateTimeKind.Local).AddTicks(2693),
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldDefaultValue: new DateTime(2023, 9, 18, 18, 47, 25, 447, DateTimeKind.Local).AddTicks(7345));

            migrationBuilder.UpdateData(
                table: "Orders",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "DeliveryTime", "OrderTime" },
                values: new object[] { new DateTime(2023, 9, 15, 14, 12, 44, 517, DateTimeKind.Local).AddTicks(6339), new DateTime(2023, 9, 15, 13, 43, 44, 517, DateTimeKind.Local).AddTicks(2693) });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 1,
                column: "Name",
                value: "Grapes");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "Address", "Password" },
                values: new object[] { "Admin 123", "$2a$11$CgUzLy4SiISDEirYnzoqJ.XZ5Hp35UwgYIetb6.cWaG1lwE9admDi" });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "Address", "FullName", "Password", "Username" },
                values: new object[] { "Seller 123", "Seller Seller", "$2a$11$vR71ebnzv0MMSwGcPJzf0u1YjwbvU5j5p/As0hqIftXUweklK/Xwy", "seller" });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "Address", "FullName", "Password", "Username" },
                values: new object[] { "Buyer 123", "Buyer Buyer", "$2a$11$5vCb/HDdyZ8sAeCbirNFmebpSV6VZLCii/JL5tI837uH.h/QmyItG", "buyer" });
        }
    }
}
