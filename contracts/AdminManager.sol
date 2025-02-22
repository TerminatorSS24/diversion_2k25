// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/access/Ownable.sol";

contract AdminManager is Ownable {
    struct Admin {
        string email;
        bytes32 passwordHash;
        bool isAdmin;
    }

    mapping(address => Admin) private admins;

    event AdminAdded(address indexed adminAddress, string email);
    event AdminRemoved(address indexed adminAddress);

    modifier onlyAdmin() {
        require(admins[msg.sender].isAdmin, "Not an admin");
        _;
    }

    /**
     * @notice Adds a new admin. Only the contract owner can do this.
     * @param _admin The address of the new admin
     * @param _email The email of the new admin
     * @param _passwordHash The keccak256 hash of the admin's password
     */
    function addAdmin(
        address _admin,
        string memory _email,
        bytes32 _passwordHash
    ) external onlyOwner {
        require(!admins[_admin].isAdmin, "Admin already exists");
        admins[_admin] = Admin(_email, _passwordHash, true);
        emit AdminAdded(_admin, _email);
    }

    /**
     * @notice Removes an admin. Only the contract owner can do this.
     * @param _admin The address of the admin to remove
     */
    function removeAdmin(address _admin) external onlyOwner {
        require(admins[_admin].isAdmin, "Not an admin");
        delete admins[_admin];
        emit AdminRemoved(_admin);
    }

    /**
     * @notice Check if an address is an admin
     */
    function isAdmin(address _admin) public view returns (bool) {
        return admins[_admin].isAdmin;
    }

    /**
     * @notice Get the email of an admin. Reverts if not an admin
     */
    function getAdminEmail(address _admin) public view returns (string memory) {
        require(admins[_admin].isAdmin, "Not an admin");
        return admins[_admin].email;
    }

    /**
     * @notice Verifies if the provided password hash matches the stored hash for _admin
     * @param _admin The admin's address
     * @param _passwordHash The hashed password (keccak256)
     * @return bool True if admin and hashes match, otherwise false
     */
    function verifyAdmin(address _admin, bytes32 _passwordHash) external view returns (bool) {
        if (!admins[_admin].isAdmin) {
            return false;
        }
        // Compare stored passwordHash with provided _passwordHash
        return (admins[_admin].passwordHash == _passwordHash);
    }
}
