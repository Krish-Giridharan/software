const API_BASE = "http://localhost:5000";

async function api(path, options = {}) {
    const response = await fetch(API_BASE + path, options);

    if (!response.ok) {
        const text = await response.text();
        throw new Error(text || `HTTP Error ${response.status}`);
    }

    return response.json();
}


async function refresh() {
    try {
        const vehicles = await api("/api/vehicles");

        // Correct ID from index.html
        const tbody = document.getElementById("vehicleTableBody");
        const emptyMessage = document.getElementById("emptyVehicleMessage");

        tbody.innerHTML = "";

        vehicles.forEach((v, index) => {
            const tr = document.createElement("tr");

            tr.innerHTML = `
                <td>${index + 1}</td>
                <td>${v.vehicle_number || "-"}</td>
                <td>${v.vehicle_type || "-"}</td>
                <td>${v.mileage || 0} km</td>
                <td>${v.next_service_date || "-"}</td>
                <td>
                    <span class="status-badge">
                        Active
                    </span>
                </td>
            `;

            tbody.appendChild(tr);
        });

        // Show/hide empty message
        if (vehicles.length === 0) {
            emptyMessage.style.display = "block";
        } else {
            emptyMessage.style.display = "none";
        }


        // Dashboard statistics
        const dash = await api("/api/dashboard");

        document.getElementById("total").textContent =
            dash.totalVehicles ?? vehicles.length;

        document.getElementById("maintenance").textContent =
            dash.maintenanceRequired ?? 0;

    } catch (error) {
        console.error("Refresh error:", error);
    }
}


// ADD VEHICLE
document.getElementById("vehicleForm").addEventListener("submit", async (e) => {

    e.preventDefault();

    const form = e.target;
    const data = Object.fromEntries(new FormData(form));

    if (data.mileage) {
        data.mileage = parseInt(data.mileage, 10);
    }

    try {

        const response = await fetch(
            API_BASE + "/api/vehicles",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(data)
            }
        );

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(errorText || "Failed to add vehicle");
        }

        const result = await response.json();

        console.log("Vehicle added:", result);

        alert("Vehicle added successfully!");

        form.reset();

        await refresh();

    } catch (error) {

        console.error("Add vehicle error:", error);

        alert("Failed to add vehicle. Check the browser console and backend logs.");

    }

});


// Initial load
refresh();